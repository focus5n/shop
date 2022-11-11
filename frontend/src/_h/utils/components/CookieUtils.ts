export class CookieUtils {
  public static get(name: string): string | undefined {
    let matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
  }

  public static set(name: string, value: string | number | boolean, cookieOptions: any): void {
    const options = {
      path: '/',
      ...cookieOptions,
    }
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString()
    }

    let updateCookie = encodeURI(name) + '=' + encodeURIComponent(value)

    for (let optionKey in options) {
      updateCookie += ';' + optionKey
      let optionValue = options[optionKey]
      if (optionValue !== true) {
        updateCookie += '=' + optionValue
      }
    }
    document.cookie = updateCookie
  }

  public static delete(name: string): void {
    CookieUtils.set(name, '', {
      'max-age': -1,
    })
  }
}
