const reviews = [
    {
        name: "Titus William Sunil",
        username: "@titus",
        body: "Jom communicates complex ideas clearly and effectively, making it easy for everyone on the team to stay aligned.",
        img: "/img/titus.jpeg",
        timestamp: "2024-10-14",
        rating: 5
    },
    {
        name: "Kishor Vinod",
        username: "@kishor",
        body: "Jom has a unique way of thinking outside the box, which has led to innovative solutions for our projects.",
        img: "/img/kishor_image.png",
        timestamp: "2024-10-13",
        rating: 4.6
    },
    {
        name: "Martin Siby",
        username: "@martin",
        body: "Whenever we faced a tough issue, Jom was the go-to person. His analytical mindset is a huge advantage.",
        img: "/img/martin.jpeg",
        timestamp: "2024-10-11",
        rating: 4.2
    },
    {
        name: "Srejus Jayakumar",
        username: "@srejus",
        body: "Jom is incredibly dedicated to his work. He often goes above and beyond to ensure the project is a success.",
        img: "/img/srejus.jpeg",
        timestamp: "2024-10-10",
        rating: 5
    },
    {
        name: "Christin Benny",
        username: "@christin",
        body: "His positive attitude is infectious! Jom brings a great energy to the team and helps keep morale high.",
        img: "/img/christin.jpeg",
        timestamp: "2024-10-09",
        rating: 4.3
    },
    {
        name: "Jefin James",
        username: "@jefin",
        body: "I've seen Jom adapt quickly to new challenges. His eagerness to learn makes him an invaluable asset to any team.",
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


