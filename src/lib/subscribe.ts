// 邮件订阅服务集成示例

// 方案1: EmailJS集成 (纯前端)
export async function subscribeWithEmailJS(email: string) {
  const emailjs = (window as any).emailjs
  
  const templateParams = {
    to_email: email,
    from_name: '技术博客',
    message: '感谢订阅我们的技术博客！'
  }

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID', 
      templateParams,
      'YOUR_PUBLIC_KEY'
    )
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

// 方案2: Mailchimp API集成
export async function subscribeWithMailchimp(email: string) {
  const MAILCHIMP_URL = 'https://YOUR_DOMAIN.us1.list-manage.com/subscribe/post-json'
  const MAILCHIMP_U = 'YOUR_U_VALUE'
  const MAILCHIMP_ID = 'YOUR_LIST_ID'

  try {
    await fetch(
      `${MAILCHIMP_URL}?u=${MAILCHIMP_U}&id=${MAILCHIMP_ID}&EMAIL=${encodeURIComponent(email)}&c=?`,
      {
        method: 'GET',
        mode: 'no-cors'
      }
    )
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

// 方案3: Formspree集成
export async function subscribeWithFormspree(email: string) {
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        _subject: '新的博客订阅',
        message: `新用户订阅: ${email}`
      })
    })

    if (response.ok) {
      return { success: true }
    } else {
      throw new Error('订阅失败')
    }
  } catch (error) {
    return { success: false, error }
  }
}

// 方案4: 本地存储 + 导出功能 (临时方案)
export function subscribeLocally(email: string) {
  try {
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]')
    const newSubscriber = {
      email,
      subscribedAt: new Date().toISOString()
    }
    
    // 检查是否已订阅
    if (subscribers.some((sub: any) => sub.email === email)) {
      return { success: false, error: '该邮箱已订阅' }
    }
    
    subscribers.push(newSubscriber)
    localStorage.setItem('subscribers', JSON.stringify(subscribers))
    
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

// 导出订阅者列表 (管理员功能)
export function exportSubscribers() {
  try {
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]')
    const csv = [
      'Email,Subscribed At',
      ...subscribers.map((sub: any) => `${sub.email},${sub.subscribedAt}`)
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscribers.csv'
    a.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('导出失败:', error)
  }
}