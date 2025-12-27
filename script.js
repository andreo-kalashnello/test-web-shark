document.addEventListener('DOMContentLoaded', function() {
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo');

    flatpickr(dateFromInput, {
        dateFormat: "d.m.Y",
        disableMobile: true,
        locale: {
            firstDayOfWeek: 0,
            weekdays: {
                shorthand: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            },
            months: {
                shorthand: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                longhand: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            }
        },
        allowInput: true
    });

    flatpickr(dateToInput, {
        dateFormat: "d.m.Y",
        defaultDate: "09.08.2016",
        disableMobile: true,
        locale: {
            firstDayOfWeek: 0,
            weekdays: {
                shorthand: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            },
            months: {
                shorthand: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                longhand: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            }
        },
        allowInput: true,
        defaultMonth: 11,
        defaultYear: 2016
    });

    const gridBtn = document.getElementById('gridBtn');
    const listBtn = document.getElementById('listBtn');
    const postsContainer = document.getElementById('posts');
    let allPosts = [];
    let displayedCount = 8;

    async function loadPosts() {
        try {
            const response = await fetch('/data.json');
            const data = await response.json();
            allPosts = data.posts;
            renderPosts();
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    }

    function renderPosts() {
        const postsToShow = allPosts.slice(0, displayedCount);
        postsContainer.innerHTML = '';

        postsToShow.forEach(post => {
            const postCard = document.createElement('a');
            postCard.className = 'post__card';
            postCard.href = '#';

            postCard.innerHTML = `
                <img class="post__card-image" src="${post.image}" alt="">
                <div class="post__card-info">
                    <div class="post__card-info-item">
                        <p>${post.label}</p>
                        <div class="post__card-stats">
                            <div class="post__card-stats-item">
                                <img src="/images/like.svg" alt="">
                                <span>${post.likes1}</span>
                            </div>
                            <div class="post__card-stats-item">
                                <img src="/images/comment.svg" alt="">
                                <span>${post.comments1}</span>
                            </div>
                        </div>
                    </div>
                    <div class="post__card-info-item">
                        <p>${post.date}</p>
                        <div class="post__card-stats">
                            <div class="post__card-stats-item">
                                <img src="/images/like.svg" alt="">
                                <span>${post.likes2}</span>
                            </div>
                            <div class="post__card-stats-item">
                                <img src="/images/comment.svg" alt="">
                                <span>${post.views}</span>
                            </div>
                        </div>
                    </div>
                    <div class="post__card-info-item">
                        <p class="post__card-upload">${post.uploadText}</p>
                        <p class="post__card-date">${post.uploadDate}</p>
                    </div>
                </div>
            `;

            postsContainer.appendChild(postCard);
        });

        updateLoadMoreButton();
    }

    function updateLoadMoreButton() {
        const loadMoreBtn = document.querySelector('.loadmore__btn');
        if (loadMoreBtn) {
            if (displayedCount >= allPosts.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }
    }

    function loadMorePosts() {
        displayedCount += 4;
        renderPosts();
    }

    const loadMoreBtn = document.querySelector('.loadmore__btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMorePosts);
    }

    function setLayout(layout) {
        if (layout === 'grid') {
            postsContainer.classList.remove('posts--list');
            postsContainer.classList.add('posts--grid');
            gridBtn.classList.add('posts__layout-btn--active');
            listBtn.classList.remove('posts__layout-btn--active');
        } else {
            postsContainer.classList.remove('posts--grid');
            postsContainer.classList.add('posts--list');
            listBtn.classList.add('posts__layout-btn--active');
            gridBtn.classList.remove('posts__layout-btn--active');
        }
    }

    gridBtn.addEventListener('click', () => setLayout('grid'));
    listBtn.addEventListener('click', () => setLayout('list'));

    loadPosts();
    setLayout('list');
});

