const getMovieType = (type) => {
    switch (type) {
        case 'movie':
            return 'Film';
        case 'series':
            return 'Serial';
        case 'episode':
            return 'Odcinek';
        default:
            return 'Nieznany?';
    }
};

// Fetch request to OMDB API
const fetchMovieData = async (query, type = "") => {
    const baseUrl = import.meta.env.VITE_APP_OMDB_API_URL;
    const apiKey = import.meta.env.VITE_APP_API_KEY;

    let url = `${baseUrl}?apikey=${apiKey}&s=${query}`;

    if (type !== "") {
        url += `&type=${type}`;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.Response === "False") {
            throw new Error(`API error: ${data.Error}`);
        }

        return data;

    } catch (error) {
        console.error('Error fetching the movie data:', error);
    }
};

const renderMovieTable = (movies) => {
    const tableBody = document.getElementById('movieTableBody');
    tableBody.innerHTML = '';

    movies.forEach((movie) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td class="pt-4 pb-2 px-4"><img src="${movie.Poster}" alt="Plakat ${movie.Title}" width="100"></td>
            <td class="py-2 px-6">${movie.Title}</td>
            <td class="py-2 px-6">${getMovieType(movie.Type)}</td>
            <td class="py-2 px-6">${movie.Year}</td>
        `;
    });
};

const handleMovieDataResponse = (data) => {
    console.log(data);

    if (!data || data.totalResults === 0) {
        showNoData();
        hideMovieTable();
        return;
    }

    hideNoData();
    showMovieTable();
    renderMovieTable(data.Search);
}

const showNoData = () => document.getElementById('noData').classList.remove('hidden');
const hideNoData = () => document.getElementById('noData').classList.add('hidden');
const showMovieTable = () => document.getElementById('movieTable').classList.remove('hidden');
const hideMovieTable = () => document.getElementById('movieTable').classList.add('hidden');

// EVENT LISTENERS
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const query = document.getElementById('search').value;
    const type = document.getElementById('type').value;

    if (!query || query === "") {
        showNoData();
        hideMovieTable();
        return;
    }

    fetchMovieData(query, type)
        .then((data) => handleMovieDataResponse(data));
});

document.getElementById('type').addEventListener('change', function (e) {
    e.preventDefault();

    const query = document.getElementById('search').value;
    const type = e.target.value;

    if (!query || query === "") {
        return;
    }

    fetchMovieData(query, type)
        .then((data) => handleMovieDataResponse(data));
});