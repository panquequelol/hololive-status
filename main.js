const plantilla = (nombre, viewers, subscribers, photo) => {
    return `<div class="bg-gray-200 mx-2 my-2 border shadow-md rounded flex flex-row">
        <img class="rounded-l h-24 w-24" src="${photo}" alt="vtuber's channel">
        <div class="my-1 mx-2">
            <p class='text-sm'>${nombre}</p>
            <div class="flex items-center text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p> <span class='text-blue-800 font-bold'>${viewers}</span> Viewers</p>
            </div>
            <div class="flex items-center text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p> <span class='text-blue-800 font-bold'>${subscribers}</span> Subscribers</p>
            </div>
        </div>
    </div>`
}

const plantillaStats = (live, ended) => `
    <p> <span class='text-blue-800 font-bold'>${live}</span> are currently live</p>
    <p> <span class='text-blue-800 font-bold'>${ended}</span> ended their stream recently</p>
`

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
        const viewers = (element.live_viewers)?element.live_viewers:0
        createDiv.innerHTML += plantilla(element.channel.name, viewers, element.channel.subscriber_count, element.channel.photo)
    })
})

const videos = async () => {
	const URL = 'https://api.holotools.app/v1/videos/';
	const respuesta = await fetch(URL);
	const data = respuesta.json();
	return data;
};

console.log(videos())