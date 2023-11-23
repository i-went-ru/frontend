const fetcher = <T>(url: string, method: string = 'GET', data?: any): Promise<T> => {
    const fullUrl = `https://api-dev.i-went.ru/api${url}`;

    const headers = new Headers({
        'Content-Type': 'application/json',

    });
    if (localStorage.getItem("token") !== null) {
        headers.append("Authorization", `Token ${localStorage.getItem("token")}`)
    }

    const config: RequestInit = {
        method: method,
        headers: headers,
        body: method !== 'GET' && data ? JSON.stringify(data) : null,
    };
   return fetch(fullUrl, config).then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<T>;
      });
}

const fetcherSWR = url => fetch(`https://api-dev.i-went.ru/api${url}`).then(r => r.json())


export { fetcher,fetcherSWR }