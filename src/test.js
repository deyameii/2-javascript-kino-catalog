const func = q => {
	document.body.style.borderColor = 'yellow'
}

async function filmInfoById(id) {
	let url = URL_ID + id
	const resp = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			'X-API-KEY': API_KEY
		}
	}).catch(reason => {
		console.log(reason)
	})
	const respData = await resp.json()
	showFilmById(respData)
}

const text = `Hello,Arch Linux defines simplicity as without unnecessary additions or modifications.
 It ships software as released by the original developers (upstream) with minimal distribution-specific (downstream)
  changes: patches not accepted by upstream are avoided, and Arch's downstream patches consist almost entirely of backported
   bug fixes that are obsoleted by the project's next release. In a similar fashion, Arch ships the configuration files provided by 
   upstream with changes limited to distribution-specific issues like adjusting the system file paths. It does not add automation 
   features such as enabling a service simply because the package was installed. Packages are only split when compelling advantages exist, 
   such as to save disk space in particularly bad cases of waste. GUI configuration utilities are not officially provided, encouraging users to perform 
   4 most system configuration from the shell and a text editor. `
