   const API_URL_RANDOM_DOG = 'https://dog.ceo/api/breeds/image/random/4';
        const API_URL_FAVORITES_DOG = 'https://api.thedogapi.com/v1/favourites?api_key=470e24e8-de87-4d54-9c66-5f450b5a125b';
        const API_URL_FAVORITES_DELETE_DOG = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;
        const API_URL_UPLOAD_DOG = 'https://api.thedogapi.com/v1/images/upload';

        const spanError = document.getElementById('error');

        async function loadRandomDogs() {
            const res = await fetch(API_URL_RANDOM_DOG);
            const data = await res.json();

            console.log('Random Dogs');
            console.log(data);

            if (res.status !== 200) {
                spanError.innerHTML = "Hubo un error: " + res.status;
            } else {
                const imgDog1 = document.getElementById('imgDog1');
                const imgDog2 = document.getElementById('imgDog2');
                const imgDog3 = document.getElementById('imgDog3');
                const imgDog4 = document.getElementById('imgDog4');

                const btn1 = document.getElementById('btn1');
                const btn2 = document.getElementById('btn2');
                const btn3 = document.getElementById('btn3');
                const btn4 = document.getElementById('btn4');

                imgDog1.src = data.message[0];
                imgDog2.src = data.message[1];
                imgDog3.src = data.message[2];
                imgDog4.src = data.message[3];

                btn1.onclick = () => saveFavoriteDogs(data.message[0]);
                btn2.onclick = () => saveFavoriteDogs(data.message[1]);
                btn3.onclick = () => saveFavoriteDogs(data.message[2]);
                btn4.onclick = () => saveFavoriteDogs(data.message[3]);
            }
        }

        async function loadFavoritesDogs() {
            const res = await fetch(API_URL_FAVORITES_DOG, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '470e24e8-de87-4d54-9c66-5f450b5a125b',
                },
            });
            const data = await res.json();
            console.log('Favorites Dogs');
            console.log(data);

            if (res.status !== 200) {
                spanError.innerHTML = "Hubo un error: " + res.status + data.message;
            } else {
                const section = document.getElementById('favoritesDogs');
                section.innerHTML = "";

                const h1 = document.createElement("h1");
                h1.classList.add("my-4");
                h1.classList.add("fw-bold");
                const h1Text = document.createTextNode('MIS PERROS FAVORITOS');
                h1.appendChild(h1Text);
                section.appendChild(h1);

                data.forEach(dog => {
                    const div = document.createElement("div");
                    div.classList.add("col-lg-3");
                    div.classList.add("col-md-6");
                    div.classList.add("col-12");

                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.classList.add("mb-4");

                    const cardbody = document.createElement("div");
                    cardbody.classList.add("card-body");

                    const imgcard = document.createElement("img");
                    imgcard.classList.add("img-card");
                    imgcard.width = 150;

                    const btneliminar = document.createElement("button");
                    btneliminar.classList.add("btn-eliminar");
                    btneliminar.classList.add("btn");
                    btneliminar.classList.add("btn-primary");
                    const btnEliminarText = document.createTextNode('Quitar Foto');
                    btneliminar.appendChild(btnEliminarText);

                    div.appendChild(card);
                    card.appendChild(cardbody);
                    cardbody.appendChild(imgcard);
                    cardbody.appendChild(btneliminar);

                    imgcard.src = dog.image.url;
                    btneliminar.onclick = () => deleteFavoriteDogs(dog.id);

                    section.appendChild(div);
                });
            }
        }

        async function saveFavoriteDogs(url) {
            const rest = await fetch(API_URL_FAVORITES_DOG, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': '470e24e8-de87-4d54-9c66-5f450b5a125b',
                },
                body: JSON.stringify({
                    image_url: url
                })
            });

            const data = await rest.json();

            console.log('Save Dogs');
            console.log(rest);

            if (rest.status !== 200) {
                console.log('jola');
                spanError.innerHTML = "Hubo un error: " + rest.status + data.message;
            } else {
                console.log('Perro guardado en favoritos');
                loadFavoritesDogs();
            }
        }

        async function deleteFavoriteDogs(id) {
            const rest = await fetch(API_URL_FAVORITES_DELETE_DOG(id), {
                method: 'DELETE',
                headers: {
                    'X-API-KEY': '470e24e8-de87-4d54-9c66-5f450b5a125b',
                },
            });

            const data = await rest.json();

            if (rest.status !== 200) {
                console.log('jola');
                spanError.innerHTML = "Hubo un error: " + rest.status + data.message;
            } else {
                console.log('Perro eliminado de favoritos');
                loadFavoritesDogs();
            }
        }

        async function uploadDogPhoto() {
            const form = document.getElementById('uploadingForm');
            const formData = new FormData(form);

            console.log(formData.get('file'));

            const res = await fetch(API_URL_UPLOAD_DOG, {
                method: 'POST',
                headers: {
                    'X-API-KEY': 'c08d415f-dea7-4a38-bb28-7b2188202e46',
                },
                body: formData,
            });
            const data = await res.json();

            if (res.status !== 201) {
                spanError.innerHTML = "Hubo un error: " + res.status + data.message;
                console.log({ data })
            } else {
                console.log('Foto de perro subida :)')
                console.log({ data })
                console.log(data.url)
                saveFavoriteDogs(data.url);
            }
        }

        loadRandomDogs();
        loadFavoritesDogs();