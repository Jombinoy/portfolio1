const reviews = [
    {
        name: "Titus William Sunil",
        username: "@titus",
        body: "Jom's problem-solving skills and positive attitude make him a joy to work with.",
        img: "/img/titus.jpeg",
        timestamp: "2024-10-14",
        rating: 5
    },
    {
        name: "Koshor Vinod",
        username: "@kishor",
        body: "Jom is super knowledgeable and always ready to help. A true team player!",
        img: "/img/kishor_image.png",
        timestamp: "2024-10-13",
        rating: 4.6
    },
    {
        name: "Martin Siby",
        username: "@martin",
        body: "Jom is as adventurous as he is skilled. Always pushing boundaries!",
        img: "/img/martin.jpeg",
        timestamp: "2024-10-11",
        rating: 4.2
    },
    {
        name: "Srejus Jayakumar",
        username: "@srejus",
        body: "Jom balances work and personal life so well. Always insightful!",
        img: "/img/srejus.jpeg",
        timestamp: "2024-10-10",
        rating: 5
    },
    {
        name: "Christin Benny",
        username: "@christin",
        body: "Jom handles pressure with ease and always looks out for others.",
        img: "/img/christin.jpeg",
        timestamp: "2024-10-09",
        rating: 4.3
    },
    {
        name: "Jefin James",
        username: "@jefin",
        body: "Jom's creativity and attention to detail are truly impressive.",
        img: "/img/jefin.jpeg",
        timestamp: "2024-10-08",
        rating: 5
    }
];


function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
        <div class="review-header">
            <img src="${review.img}" alt="${review.name}'s profile picture" class="review-image">
            <div>
                <div class="review-name">${review.name}</div>
                <div class="review-username">${review.username}</div>
                <div class="review-rating">Rating: ${review.rating} ★</div>
                <div class="review-timestamp">${new Date(review.timestamp).toLocaleDateString()}</div>
            </div>
        </div>
        <div class="review-body">${review.body}</div>
    `;
    return card;
}

function populateMarquee(marqueeId, reviews) {
    const marquee = document.getElementById(marqueeId);
    marquee.innerHTML = ""; // Clear previous content for loading effect
    reviews.forEach(review => {
        marquee.appendChild(createReviewCard(review));
    });
}

// Populate each marquee with reviews
const half = Math.ceil(reviews.length / 2);
const firstRow = reviews.slice(0, half);
const secondRow = reviews.slice(half);

populateMarquee('marquee1', firstRow);
populateMarquee('marquee2', secondRow);


