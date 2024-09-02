const apiKey = 'live_NzA2zkvp0ldt8lXMU1UUpLV3QVSQwSUE06MrwaFY517E0JRYoZALkKS86ik8GqIl';
const breedInput = document.getElementById('breed-input');
const searchButton = document.getElementById('search-btn');
const randomButton = document.getElementById('random-btn');
const catCard = document.querySelector('.cat-card');
const catImage = document.getElementById('cat-image');
const catBreed = document.getElementById('cat-breed');
const catDescription = document.getElementById('cat-description');


function hideCatDetails() {
    catCard.style.display = 'none'; 
    catImage.src = '';
    catImage.alt = '';
    catBreed.textContent = '';
    catDescription.textContent = '';
}


function showCatDetails(imageUrl, breedName, description) {
    catImage.src = imageUrl;
    catImage.alt = breedName;
    catBreed.textContent = breedName;
    catDescription.textContent = description;
    catCard.style.display = 'block'; 
}


async function fetchCatByBreed(breedName) {
    try {
        hideCatDetails(); // Esconde os detalhes antes da nova busca
        const breedResponse = await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`);
        const breeds = await breedResponse.json();

        const breed = breeds.find(b => b.name.toLowerCase() === breedName.toLowerCase());

        if (breed) {
            const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${apiKey}&breed_ids=${breed.id}`);
            const data = await imageResponse.json();
            const cat = data[0];

            showCatDetails(cat.url, breed.name, breed.temperament);
        } else {
            alert('Raça não encontrada. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao buscar gato:', error);
        alert('Ocorreu um erro ao buscar os dados do gato. Por favor, tente novamente.');
    }
}


async function fetchRandomCat() {
    try {
        hideCatDetails(); 
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${apiKey}`);
        const data = await response.json();
        const cat = data[0];

        const breedName = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0].name : 'Raça Desconhecida';
        const description = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0].temperament : '';

        showCatDetails(cat.url, breedName, description);
    } catch (error) {
        console.error('Erro ao buscar gato aleatório:', error);
        alert('Ocorreu um erro ao buscar os dados do gato. Por favor, tente novamente.');
    }
}


searchButton.addEventListener('click', () => {
    const breedName = breedInput.value.trim();
    if (breedName) {
        fetchCatByBreed(breedName);
    } else {
        alert('Por favor, digite uma raça de gato.');
    }
});


randomButton.addEventListener('click', fetchRandomCat);


hideCatDetails();
