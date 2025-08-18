document.addEventListener("DOMContentLoaded", () => {
  // Global variables
  let currentNews = [];
  let currentFilter = 'all';
  let newsPage = 1;
  const newsPerPage = 6;

  // DOM elements
  const subscribeBtn = document.getElementById("subscribe-btn");
  const subscribeModal = document.getElementById("subscribe-modal");
  const closeBtn = document.querySelector(".close-btn");
  const subscribeForm = document.getElementById("subscribe-form");
  const newsContainer = document.getElementById("news-container");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const loading = document.getElementById("loading");
  const filterBtns = document.querySelectorAll(".filter-btn");

  // AI news images from Unsplash
  const aiImages = [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=600&auto=format&fit=crop'
  ];

  // Initialize the application
  init();

  function init() {
    setupEventListeners();
    loadNews();
    createScrollToTopButton();
  }

  function setupEventListeners() {
    // Subscribe modal functionality
    subscribeBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", handleOutsideClick);
    subscribeForm.addEventListener("submit", handleSubscription);
    
    // Filter functionality
    filterBtns.forEach(btn => {
      btn.addEventListener("click", handleFilterClick);
    });
    
    // Load more functionality
    loadMoreBtn.addEventListener("click", loadMoreNews);
  }

  function openModal() {
    subscribeModal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    subscribeModal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  function handleOutsideClick(event) {
    if (event.target === subscribeModal) {
      closeModal();
    }
  }

  function handleSubscription(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const frequency = document.getElementById("frequency").value;
    
    // Show success message
    showSuccessMessage(`Thank you ${name}! You've been subscribed with email: ${email} for ${frequency} updates.`);
    
    // Reset form and close modal
    subscribeForm.reset();
    closeModal();
  }

  function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = message;
    
    document.body.insertBefore(successDiv, document.body.firstChild);
    
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }

  function handleFilterClick(event) {
    const category = event.target.dataset.category;
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter news
    currentFilter = category;
    filterNews();
  }

  function filterNews() {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
      const cardCategory = card.dataset.category;
      
      if (currentFilter === 'all' || cardCategory === currentFilter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.6s ease-out';
      } else {
        card.classList.add('hidden');
      }
    });
  }

  function loadNews() {
    loading.classList.remove('hidden');
    
    // Try to fetch from output.json first
    fetch('output.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('output.json not found');
        }
        return res.json();
      })
      .then(data => {
        setTimeout(() => {
          currentNews = generateNewsFromData(data);
          displayNews(currentNews.slice(0, newsPage * newsPerPage));
          loading.classList.add('hidden');
        }, 1000); // Simulate loading time
      })
      .catch(error => {
        console.error("Error loading news:", error);
        loading.classList.add('hidden');
        newsContainer.innerHTML = `<p class="error-message">Failed to load news. Please try again later.</p>`;
      });
  }

  function generateNewsFromData(data) {
    return data.map((item, index) => {
      const image = aiImages[index % aiImages.length];
      return {
        title: item.title || "Untitled News",
        description: item.summary || "No description available.",
        category: item.tag || "general",
        url: item.url || "#",
        image: image
      };
    });
  }

  function displayNews(newsList) {
    newsContainer.innerHTML = "";
    newsList.forEach(news => {
      const newsCard = document.createElement("div");
      newsCard.className = "news-card";
      newsCard.dataset.category = news.category;
      newsCard.innerHTML = `
        <img src="${news.image}" alt="AI News Image">
        <h3>${news.title}</h3>
        <p>${news.description}</p>
        <a href="${news.url}" target="_blank">Read More</a>
      `;
      newsContainer.appendChild(newsCard);
    });
    filterNews();
  }

  function loadMoreNews() {
    newsPage++;
    displayNews(currentNews.slice(0, newsPage * newsPerPage));
    
    if (newsPage * newsPerPage >= currentNews.length) {
      loadMoreBtn.style.display = "none";
    }
  }

  function createScrollToTopButton() {
    const scrollBtn = document.createElement("button");
    scrollBtn.id = "scroll-to-top";
    scrollBtn.innerText = "↑";
    scrollBtn.classList.add("hidden");
    document.body.appendChild(scrollBtn);

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.remove("hidden");
      } else {
        scrollBtn.classList.add("hidden");
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
