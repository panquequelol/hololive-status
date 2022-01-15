const burgerMenu = document.getElementById('burger-menu')
const showMenuId = document.getElementById('show-menu')

const burgerOpen = document.getElementById('open')
const burgerClose = document.getElementById('close')

const showMenu = () => {
    if (showMenuId.classList.contains('hidden')){
        showMenuId.classList.remove('hidden')
        showMenuId.classList.add('flex')
        burgerClose.classList.remove('hidden')
        burgerOpen.classList.add('hidden')
    } else {
        showMenuId.classList.remove('flex')
        showMenuId.classList.add('hidden')
        burgerOpen.classList.remove('hidden')
        burgerClose.classList.add('hidden')
    }
}

burgerMenu.onclick = showMenu

const plantilla = (nombre, viewers, title, photo, youtubeLink, youtubeChannel) => {
    return `<div class="bg-gray-200 mx-2 my-2 border shadow-md rounded flex flex-row max-w-fit">
        <a class="hover:mouse-pointer shrink-0" href='${youtubeLink}' target='_blank'>
            <img class="rounded-l h-24 w-32 hover:opacity-70" src="${photo}" alt="vtuber's channel">
        </a>
        <div class="my-1 mx-2">
            <a href='${youtubeLink}' target='_blank'><h2 class='text-sm tracking-tight hover:text-blue-600 hover:underline hover:decoration-blue-500'>${title}</h2></a>
            <div class="flex items-center text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p> <span class='text-blue-700 font-semibold font-mono'>${viewers}</span> Viewers</p>
            </div>
            <div class="flex items-center text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <a href='https://www.youtube.com/channel/${youtubeChannel}' target='_blank' class='text-blue-700 font-semibold font-mono tracking-tighter'>${nombre}</a>
            </div>
        </div>
    </div>`
}

const plantillaStats = (live, ended) => `
    <p> <span class='text-blue-800 font-bold font-mono'>${live}</span> are currently live</p>
    <p> <span class='text-blue-800 font-bold font-mono'>${ended}</span> ended their stream recently</p>
`

const plantillaTalent = (name, subscribers, photo) => `<div class="flex flex-col">
<img class="object-cover h-16 w-16 rounded" src="${photo}" alt="prueba">
<div class="text-sm text-center mt-1">
    <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <p class='text-blue-600 font-mono font-semibold'>${subscribers}</p> 
    </div>
    <p class="text-xs -translate-y-1">Subscribers</p>
</div>
</div>`

const vtubers = async () => {
	const URL = 'https://api.holotools.app/v1/live';
	const respuesta = await fetch(URL);
	const data = respuesta.json();
	return data;
};

let createDiv = document.getElementById('live-vtubers')
let statsDOM = document.getElementById('stats')

vtubers().then( value => {

    statsDOM.innerHTML = plantillaStats(value.live.length, value.ended.length)
    
    value.live.forEach(element => {
        // console.log(element.channel)
        
        if (element.live_viewers) {
            const { name, subscriber_count:subscribers, photo, yt_channel_id:youtubeChannel } = element.channel
            const { live_viewers:viewers, title, yt_video_key:youtube } = element
            const thumbnail = `https://img.youtube.com/vi/${youtube}/hqdefault.jpg`
            const youtubeLink = `https://www.youtube.com/watch?v=${youtube}`


            createDiv.innerHTML += plantilla(name, viewers, title, thumbnail, youtubeLink, youtubeChannel)
        }
    })
}).then( nada => document.querySelectorAll('[id=loading-spin]').forEach( spin => spin.classList.add('hidden')))

const videos = async() => {
	const URL = 'https://api.holotools.app/v1/videos/';
	const respuesta = await fetch(URL);
	const data = respuesta.json();
	return data;
};

const channels = async() => {
    const URL = 'https://api.holotools.app/v1/channels/';
	const respuesta = await fetch(URL);
	const data = respuesta.json();
	return data;
}

let talentCorrusel = document.getElementById('talent')

channels().then( value => {
    // console.log(value)
    value.channels.forEach( element => {
        const { photo, subscriber_count:subscribers, name } = element
        talentCorrusel.innerHTML += plantillaTalent(name, subscribers, photo)
    })
})

const warning = document.getElementById('warning')
const warningButton = document.getElementById('warningButton')
const eraseWarning = () => warning.classList.add('hidden')
warningButton.onclick = eraseWarning