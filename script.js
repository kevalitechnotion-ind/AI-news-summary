// Daily AI News Digest JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const subscribeBtn = document.getElementById('subscribe-btn');
  const modal = document.getElementById('subscribe-modal');
  const closeBtn = document.querySelector('.close-btn');
  const categoryBtns = document.querySelectorAll('.category-btn');
  const backToTopBtn = document.getElementById('back-to-top');
  const loading = document.getElementById('loading');
  const newsContainer = document.getElementById('news-container');
  const subscribeForm = document.getElementById('subscribe-form');
  
  // Subscribe modal functionality
  subscribeBtn.addEventListener('click', function() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });
  
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Category filter functionality
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get selected category
      const category = this.dataset.category;
      
      // Filter news based on category
      filterNewsByCategory(category);
      
      console.log('Selected category:', category);
    });
  });
  
  // Back to top functionality
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  });
  
  // Form submission handling
  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      interests: formData.get('interests')
    };
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with your actual subscription logic)
    setTimeout(() => {
      console.log('User subscribed:', userData);
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Close modal
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      
      // Show success message
      showNotification('Thank you for subscribing! We\'ll keep you updated with the latest AI news.', 'success');
      
      // Reset form
      this.reset();
    }, 1500);
  });
  
  // Initialize page - load news
  initializePage();
  
  // Function to initialize the page
  function initializePage() {
    // Show loading spinner
    loading.style.display = 'flex';
    newsContainer.style.display = 'none';
    
    // Simulate loading news (replace with your actual news fetching logic)
    setTimeout(() => {
      loadDemoNews();
      hideLoadingShowContent();
    }, 2000);
  }
  
  // Function to hide loading and show content
  function hideLoadingShowContent() {
    loading.style.display = 'none';
    newsContainer.style.display = 'grid';
    
    // Add fade-in animation to news cards
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
  
  // Function to load demo news (replace with your actual news loading function)
  function loadDemoNews() {
    const demoNews = [
      {
        title: "Revolutionary AI Breakthrough in Natural Language Processing",
        content: "Scientists have developed a new AI model that can understand context better than ever before, marking a significant leap in natural language processing capabilities...",
        source: "AI Research Daily",
        date: "2 hours ago",
        category: "research",
        isBreaking: false,
        isViral: true
      },
      {
        title: "Major Tech Company Announces AI Integration Plans",
        content: "Leading technology firm reveals comprehensive strategy for AI implementation across all products, promising to revolutionize user experience...",
        source: "Tech News Today",
        date: "4 hours ago",
        category: "best",
        isBreaking: true,
        isViral: false
      },
      {
        title: "AI Ethics Committee Releases New Guidelines",
        content: "International panel of experts publishes comprehensive guidelines for responsible AI development, addressing privacy and safety concerns...",
        source: "Ethics in AI",
        date: "6 hours ago",
        category: "relevant",
        isBreaking: false,
        isViral: false
      },
      {
        title: "Breakthrough in AI-Powered Medical Diagnosis",
        content: "New AI system demonstrates 95% accuracy in early disease detection, potentially saving millions of lives through early intervention...",
        source: "Medical AI Journal",
        date: "8 hours ago",
        category: "research",
        isBreaking: false,
        isViral: true
      },
      {
        title: "AI Startup Secures $100M in Funding",
        content: "Emerging AI company focused on autonomous systems receives major investment, signaling strong market confidence in AI technologies...",
        source: "Startup Weekly",
        date: "12 hours ago",
        category: "best",
        isBreaking: true,
        isViral: false
      },
      {
        title: "New AI Model Achieves Human-Level Performance",
        content: "Latest language model demonstrates unprecedented capabilities in reasoning and problem-solving, approaching human-level intelligence...",
        source: "AI Advances",
        date: "1 day ago",
        category: "research",
        isBreaking: false,
        isViral: true
      }
    ];
    
    // Store news data globally for filtering
    window.newsData = demoNews;
    
    // Create news cards
    displayNews(demoNews);
  }
  
  // Function to display news cards
  function displayNews(newsArray) {
    newsContainer.innerHTML = '';
    
    newsArray.forEach((news, index) => {
      const card = document.createElement('div');
      card.className = 'news-card';
      card.setAttribute('data-category', news.category);
      
      // Add special badges for breaking/viral news
      let badges = '';
      if (news.isBreaking) {
        badges += '<span class="news-badge breaking">Breaking</span>';
      }
      if (news.isViral) {
        badges += '<span class="news-badge viral">Viral</span>';
      }
      
      card.innerHTML = `
        <div class="news-badges">${badges}</div>
        <h3>${news.title}</h3>
        <p>${news.content}</p>
        <div class="news-meta">
          <span class="news-source">${news.source}</span>
          <span class="news-date">${news.date}</span>
        </div>
      `;
      
      // Add click event to news card
      card.addEventListener('click', function() {
        openNewsModal(news);
      });
      
      newsContainer.appendChild(card);
    });
  }
  
  // Function to filter news by category
  function filterNewsByCategory(category) {
    if (!window.newsData) return;
    
    let filteredNews = window.newsData;
    
    switch (category) {
      case 'best':
        filteredNews = window.newsData.filter(news => news.category === 'best');
        break;
      case 'viral':
        filteredNews = window.newsData.filter(news => news.isViral);
        break;
      case 'relevant':
        filteredNews = window.newsData.filter(news => news.category === 'relevant');
        break;
      case 'breaking':
        filteredNews = window.newsData.filter(news => news.isBreaking);
        break;
      case 'research':
        filteredNews = window.newsData.filter(news => news.category === 'research');
        break;
      case 'all':
      default:
        filteredNews = window.newsData;
        break;
    }
    
    // Re-display filtered news
    displayNews(filteredNews);
  }
  
  // Function to open news in modal (you can customize this)
  function openNewsModal(news) {
    console.log('Opening news:', news.title);
    // You can implement a news detail modal here
    // For now, just log to console
  }
  
  // Function to show notifications
  function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '9999',
      transform: 'translateX(400px)',
      transition: 'transform 0.3s ease',
      maxWidth: '400px',
      wordWrap: 'break-word'
    });
    
    // Set background color based on type
    switch (type) {
      case 'success':
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        break;
      case 'error':
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        break;
      case 'warning':
        notification.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
        break;
      default:
        notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
        break;
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
    
    // Add click to dismiss
    notification.addEventListener('click', () => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });
  }
  
  // Function to refresh news (you can call this to reload news)
  function refreshNews() {
    // Show loading
    loading.style.display = 'flex';
    newsContainer.style.display = 'none';
    
    // Simulate API call
    setTimeout(() => {
      loadDemoNews();
      hideLoadingShowContent();
      showNotification('News updated successfully!', 'success');
    }, 1000);
  }
  
  // Function to search news (you can implement this)
  function searchNews(query) {
    if (!window.newsData || !query.trim()) {
      displayNews(window.newsData || []);
      return;
    }
    
    const filteredNews = window.newsData.filter(news => 
      news.title.toLowerCase().includes(query.toLowerCase()) ||
      news.content.toLowerCase().includes(query.toLowerCase()) ||
      news.source.toLowerCase().includes(query.toLowerCase())
    );
    
    displayNews(filteredNews);
    
    if (filteredNews.length === 0) {
      showNotification(`No news found for "${query}"`, 'warning');
    }
  }
  
  // Add search functionality (if you add a search input)
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchNews(this.value);
      }, 300);
    });
  }
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Press 'R' to refresh news
    if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.altKey && !e.metaKey) {
      const activeElement = document.activeElement;
      if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
        refreshNews();
      }
    }
    
    // Press 'S' to focus search (if search input exists)
    if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.altKey && !e.metaKey) {
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    }
  });
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe news cards for animations
  function observeNewsCards() {
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
      observer.observe(card);
    });
  }
  
  // Add resize handler for responsive behavior
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Handle responsive changes here if needed
      console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
    }, 250);
  });
  
  // Add error handling for network requests
  window.addEventListener('online', function() {
    showNotification('Connection restored!', 'success');
  });
  
  window.addEventListener('offline', function() {
    showNotification('You are currently offline', 'warning');
  });
  
  // Expose functions to global scope for external use
  window.AINews = {
    refreshNews: refreshNews,
    searchNews: searchNews,
    filterNewsByCategory: filterNewsByCategory,
    showNotification: showNotification
  };
  
  console.log('Daily AI News Digest initialized successfully!');
});

// Additional utility functions

// Function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return '1 day ago';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
}

// Function to truncate text
function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substr(0, maxLength) + '...';
}

// Function to validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Function to debounce function calls
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Function to throttle function calls
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
