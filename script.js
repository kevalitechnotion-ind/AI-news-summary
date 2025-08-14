document.addEventListener("DOMContentLoaded", () => {
  // Subscribe modal functionality
  const subscribeBtn = document.getElementById("subscribe-btn");
  const subscribeModal = document.getElementById("subscribe-modal");
  const closeBtn = document.querySelector(".close-btn");
  const subscribeForm = document.getElementById("subscribe-form");

  // Open modal
  subscribeBtn.addEventListener("click", () => {
    subscribeModal.style.display = "block";
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    subscribeModal.style.display = "none";
  });

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === subscribeModal) {
      subscribeModal.style.display = "none";
    }
  });

  // Handle form submission
  subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    
    // Here you would typically send the data to your server
    alert(`Thank you ${name}! You've been subscribed with email: ${email}`);
    
    // Reset form and close modal
    subscribeForm.reset();
    subscribeModal.style.display = "none";
  });

  // News loading functionality
  loadNews();

  function loadNews() {
    // Try to fetch from output.json first
    fetch('output.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('output.json not found');
        }
        return res.json();
      })
      .then(data => {
        displayNews(data);
      })
      .catch(err => {
        console.log('output.json not found, using sample data');
        // Use sample data if output.json is not available
        const sampleData = {
          best_news: {
            title: "Revolutionary AI Model Achieves Human-Level Reasoning",
            summary: "Scientists have developed a groundbreaking AI system that demonstrates **unprecedented reasoning capabilities**, matching human performance on complex logical tasks. The model uses **novel neural architectures** that could transform how we approach artificial intelligence development.",
            url: "https://example.com/ai-reasoning-breakthrough"
          },
          most_viral_news: {
            title: "AI Chatbot Creates Viral Social Media Sensation",
            summary: "An AI-powered chatbot has taken social media by storm, generating **millions of interactions** within 24 hours. The bot's **witty responses** and human-like personality have sparked widespread discussion about the future of AI communication.",
            url: "https://example.com/viral-ai-chatbot"
          }
        };
        displayNews(sampleData);
      });
  }

  function displayNews(data) {
    const container = document.getElementById("news-container");
    
    function highlightSummary(summary) {
      return summary.replace(/\*\*(.*?)\*\*/g, '<span class="highlight">$1</span>');
    }

    const createNewsCard = (title, summary, tag, url) => {
      const formattedSummary = highlightSummary(summary);
      return `
        <div class="news-card">
          <h2>${tag}</h2>
          <h3>
            <a href="${url}" target="_blank" style="text-decoration:none; color:inherit;">
              ${title}
            </a>
          </h3>
          <p><strong>Summary:</strong> ${formattedSummary}</p>
        </div>
      `;
    };

    const best = data.best_news;
    const viral = data.most_viral_news;
    const relevant = data.relevant_news;

    container.innerHTML = `
      ${createNewsCard(best.title, best.summary, "Best AI News", best.url)}
      ${createNewsCard(viral.title, viral.summary, "Most Viral AI News", viral.url)}
      ${createNewsCard(relevant.title, relevant.summary, "relevant AI News", relevant.url)}
    `;
  }

}); 