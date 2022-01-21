const burgerMenu = document.getElementById('burger-menu');
const showMenuId = document.getElementById('show-menu');

const burgerOpen = document.getElementById('open');
const burgerClose = document.getElementById('close');

const showMenu = () => {
	if (showMenuId.classList.contains('hidden')) {
		showMenuId.classList.remove('hidden');
		showMenuId.classList.add('flex');
		burgerClose.classList.remove('hidden');
		burgerOpen.classList.add('hidden');
	} else {
		showMenuId.classList.remove('flex');
		showMenuId.classList.add('hidden');
		burgerOpen.classList.remove('hidden');
		burgerClose.classList.add('hidden');
	}
};

burgerMenu.onclick = showMenu;

const liveFormat = (
	nombre,
	viewers,
	title,
	photo,
	youtubeLink,
	youtubeChannel
) => {
	return `<div class="bg-gray-200 mx-2 my-2 border shadow-md rounded flex flex-row min-w-fit">
        <a class="hover:mouse-pointer shrink-0" href='${youtubeLink}' target='_blank'>
            <img class="rounded-l h-24 w-32 hover:opacity-70" src="${photo}" alt="vtuber's channel">
        </a>
        <div class="my-1 mx-2 text-xs sm:text-sm md:text-lg">
            <a href='${youtubeLink}' target='_blank'><h2 class='tracking-tight hover:text-blue-600 hover:underline hover:decoration-blue-500'>${title}</h2></a>
            <div class="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p> <span class='text-slate-700 font-semibold font-mono'>${viewers}</span> Viewers</p>
            </div>
            <div class="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                	<a href='https://www.youtube.com/channel/${youtubeChannel}' target='_blank' class='text-blue-700 font-semibold font-mono tracking-tighter'>${nombre}</a>
            </div>
        </div>
    </div>`;
};

const statsFormat = (live, ended) => `
    <p> <span class='text-blue-800 font-bold font-mono'>${live}</span> are currently live</p>
    <p> <span class='text-blue-800 font-bold font-mono'>${ended}</span> ended their stream recently</p>
`;

const channelsFormat = (
	name,
	subscribers,
	photo,
	link
) => `<div class="flex flex-col">
		<a class="rounded max-w-fit hover:opacity-70" href="${link}" target="_blank">
			<img class="object-cover h-16 w-16 rounded" src="${photo}" alt="prueba">
		</a>
		<div class="text-sm text-center mt-1">
			<div class="flex items-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
				</svg>
				<p class='text-slate-700 font-mono font-semibold'>${subscribers}</p> 
			</div>
			<p class="text-xs -translate-y-1">Subscribers</p>
		</div>
	</div>`;

const videosFormat = (
	name,
	title,
	photo,
	link
) => `<div class="flex flex-col justify-start my-2 items-center gap-2 px-4">
		<a class="bg-blue-300 rounded" href="${link}" target="_blank">
			<img class="object-cover rounded hover:opacity-70 hover:animate-pulse transition-all transform shadow-md  hover:ring-4 hover:ring-blue-500" src="${photo}" alt="thumbnail">
		</a>
		<div class='text-center'>
			<a class="text-sm text-blue-600 hover:underline" href="${link}" target="_blank">${title}</a>
			<p class="text-xs text-gray-600">by ${name}</p>
		</div>
	</div>`;


let videosDOM = document.getElementById('videos');
let liveDOM = document.getElementById('live-vtubers');
let statsDOM = document.getElementById('stats');

const vtubers = async () => {
	const URL = 'https://api.holotools.app/v1/live';
	const respuesta = await fetch(URL);
	const data = respuesta.json();
	return data;
};

vtubers()
	.then((value) => {
		statsDOM.innerHTML = statsFormat(value.live.length, value.ended.length);

		value.live.forEach((element) => {
			if (element.live_viewers) {
				const {
					name,
					subscriber_count: subscribers,
					photo,
					yt_channel_id: youtubeChannel,
				} = element.channel;
				const { live_viewers: viewers, title, yt_video_key: youtube } = element;
				const thumbnail = `https://img.youtube.com/vi/${youtube}/hqdefault.jpg`;
				const youtubeLink = `https://www.youtube.com/watch?v=${youtube}`;

				liveDOM.innerHTML += liveFormat(
					name,
					viewers,
					title,
					thumbnail,
					youtubeLink,
					youtubeChannel
				);
			}
		});
	})
	.then((nada) =>
		document
			.querySelectorAll('[id=loading-spin]')
			.forEach((spin) => spin.classList.add('hidden'))
	);

const videos = async () => {
	const URL = 'https://api.holotools.app/v1/videos/';
	const respuesta = await fetch(URL);
	const data = respuesta.json();
	return data;
};

// videos().then((value) => {
// 	value.videos.forEach((video) => {

// 		if (video.is_uploaded || (video.is_uploaded == false && video.live_end !== null)) {
// 			const { title, yt_video_key: youtubeID, channel } = video;
// 			const thumbnail = `https://img.youtube.com/vi/${youtubeID}/hqdefault.jpg`;
// 			const youtubeVideo = `https://www.youtube.com/watch?v=${youtubeID}`;

// 			videosDOM.innerHTML += videosFormat(
// 				channel.name,
// 				title,
// 				thumbnail,
// 				youtubeVideo
// 			)};
// })

videos().then(value=>{
	value.videos.forEach(video=>{
		if (video.is_uploaded || (video.is_uploaded == false && video.live_end !== null)){
			const { title, yt_video_key: youtubeID, channel } = video;
			const thumbnail = `https://img.youtube.com/vi/${youtubeID}/hqdefault.jpg`;
			const youtubeVideo = `https://www.youtube.com/watch?v=${youtubeID}`;

			videosDOM.innerHTML += videosFormat(
				channel.name,
				title,
				thumbnail,
				youtubeVideo
			)
		}
	})
})

const channels = async () => {
	const URL = 'https://api.holotools.app/v1/channels/';
	const respuesta = await fetch(URL);
	const data = respuesta.json();
	return data;
};

let talentCorrusel = document.getElementById('talent');

channels().then((value) => {
	console.log(value);
	value.channels.forEach((element) => {
		const {
			photo,
			subscriber_count: subscribers,
			name,
			yt_channel_id: youtubeID,
		} = element;
		const youtubeChannel = `https://www.youtube.com/channel/${youtubeID}`;
		talentCorrusel.innerHTML += channelsFormat(
			name,
			subscribers,
			photo,
			youtubeChannel
		);
	});
});

const warning = document.getElementById('warning');
const warningButton = document.getElementById('warningButton');
const eraseWarning = () => warning.classList.add('hidden');
warningButton.onclick = eraseWarning;
