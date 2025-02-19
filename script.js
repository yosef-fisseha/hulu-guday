// Sample data for website information
const websites = [
    {
      name: "Ethiopian Immigration and Citizenship Service",
      url: "https://ics.gov.et/",
      description: "",
      category: "Passport",
      lastUpdated: "2025-02-15",
      logo: "https://addisfortune.news/wp-content/uploads/2024/01/ICS.jpg",
    },
    {
      name: "Ethiopian Airlines",
      url: "https://www.ethiopianairlines.com/et",
      description: "",
      category: "Airline",
      lastUpdated: "2025-02-14",
      logo: "https://www.childjusticeinafrica.info/images/ET-vertical-logo-160-x-150-01-Resized-for-CJ-2.PNG",
    },
    
    {
      name: "Ethio telecom",
      url: "https://www.ethiotelecom.et/",
      description: "",
      category: "Telecom",
      lastUpdated: "2025-02-13",
      logo: "https://pbs.twimg.com/media/D4WAZckX4AAUBMD.jpg:large",
    },
    {
      name: "commercial bank of ethiopia",
      url: "https://combanketh.et/",
      description: "",
      category: "Bank",
      lastUpdated: "2025-02-12",
      logo: "https://th.bing.com/th/id/OIP.0JoRYapnvgW0CfjK3SuY6gHaE7?rs=1&pid=ImgDetMain",
    },
    {
      name: "ethiopian electric",
      url: "http://www.ethiopianelectricutility.gov.et/",
      description: "",
      category: "Electric",
      lastUpdated: "2025-02-11",
      logo: "https://th.bing.com/th/id/OIP.QrV1RU2RMDdlCCpH61o3DwHaHa?rs=1&pid=ImgDetMain",
    },
    {
      name: "Ethiopian Railway Corporation",
      url: "https://erc.gov.et/",
      description: "",
      category: "Transport",
      lastUpdated: "2025-02-10",
      logo: "https://www.developmentaid.org/files/organizationLogos/ethiopian-railway-corporation-erc-170579.jpg",
    },
    
    ,
  ]
  
  // Function to create a website card
  function createWebsiteCard(website) {
    const card = document.createElement("div")
    card.classList.add("website-card")
    card.innerHTML = `
          <div class="website-logo-container">
              <img src="${website.logo}" alt="${website.name} logo" class="website-logo">
          </div>
          <div class="website-info">
              <span class="category category-${website.category.toLowerCase().replace(" ", "-")}">${website.category}</span>
              <h2>${website.name}</h2>
              <p>${website.description}</p>
              <div class="website-actions">
                  <a href="${website.url}" target="_blank">Visit Website</a>
                  <button class="copy-url" data-url="${website.url}">Copy URL</button>
              </div>
              <p class="last-updated">Last updated: ${website.lastUpdated}</p>
          </div>
      `
    return card
  }
  
  // Function to display all websites
  function displayWebsites(websitesToShow) {
    const container = document.getElementById("websites-container")
    container.innerHTML = ""
    websitesToShow.forEach((website) => {
      const card = createWebsiteCard(website)
      container.appendChild(card)
    })
    addCopyUrlListeners()
  }
  
  // Function to filter websites based on search input and category
  function filterWebsites(searchTerm, category) {
    return websites.filter(
      (website) =>
        (website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          website.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (category === "" || website.category === category),
    )
  }
  
  // Function to add copy URL listeners
  function addCopyUrlListeners() {
    document.querySelectorAll(".copy-url").forEach((button) => {
      button.addEventListener("click", (e) => {
        const url = e.target.getAttribute("data-url")
        navigator.clipboard.writeText(url).then(() => {
          alert("URL copied to clipboard!")
        })
      })
    })
  }
  
  // Function to handle autocomplete
  function handleAutocomplete() {
    const searchInput = document.getElementById("search-input")
    const autocompleteResults = document.getElementById("autocomplete-results")
  
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase()
      const matchingWebsites = websites.filter(
        (website) =>
          website.name.toLowerCase().includes(searchTerm) || website.description.toLowerCase().includes(searchTerm),
      )
  
      autocompleteResults.innerHTML = ""
      matchingWebsites.forEach((website) => {
        const item = document.createElement("div")
        item.classList.add("autocomplete-item")
        item.textContent = website.name
        item.addEventListener("click", () => {
          searchInput.value = website.name
          autocompleteResults.style.display = "none"
          updateResults()
        })
        autocompleteResults.appendChild(item)
      })
  
      autocompleteResults.style.display = matchingWebsites.length > 0 ? "block" : "none"
    })
  
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !autocompleteResults.contains(e.target)) {
        autocompleteResults.style.display = "none"
      }
    })
  }
  
  // Event listener for search input and category filter
  document.getElementById("search-input").addEventListener("input", updateResults)
  document.getElementById("category-filter").addEventListener("change", updateResults)
  
  function updateResults() {
    const searchTerm = document.getElementById("search-input").value
    const category = document.getElementById("category-filter").value
    const filteredWebsites = filterWebsites(searchTerm, category)
    displayWebsites(filteredWebsites)
  }
  
  // Dark mode toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle")
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
    const icon = darkModeToggle.querySelector("i")
    icon.classList.toggle("fa-moon")
    icon.classList.toggle("fa-sun")
  })
  
  // View toggle (grid/list)
  const viewToggle = document.getElementById("view-toggle")
  const websitesContainer = document.getElementById("websites-container")
  viewToggle.addEventListener("click", () => {
    websitesContainer.classList.toggle("websites-grid")
    websitesContainer.classList.toggle("websites-list")
    const icon = viewToggle.querySelector("i")
    icon.classList.toggle("fa-th-large")
    icon.classList.toggle("fa-list")
  })
  
  // Random website button
  const randomWebsiteButton = document.getElementById("random-website")
  randomWebsiteButton.addEventListener("click", () => {
    const randomWebsite = websites[Math.floor(Math.random() * websites.length)]
    window.open(randomWebsite.url, "_blank")
  })
  
  // Back to top button
  const backToTopButton = document.getElementById("back-to-top")
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      backToTopButton.style.display = "block"
    } else {
      backToTopButton.style.display = "none"
    }
  })
  
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
  
  // Function to create the featured websites carousel
  function createFeaturedWebsites() {
    const featuredSection = document.createElement("section")
    featuredSection.classList.add("featured-websites")
    featuredSection.innerHTML = "<h2>Featured Websites</h2>"
  
    const carousel = document.createElement("div")
    carousel.classList.add("featured-carousel")
  
    const featuredWebsites = websites.slice(0, 5) // Get the first 5 websites
    featuredWebsites.forEach((website) => {
      const card = createWebsiteCard(website)
      card.classList.add("featured-website-card")
      carousel.appendChild(card)
    })
  
    featuredSection.appendChild(carousel)
  
    // Add carousel controls
    const prevButton = document.createElement("button")
    prevButton.textContent = "Previous"
    prevButton.addEventListener("click", () => shiftCarousel(-1))
  
    const nextButton = document.createElement("button")
    nextButton.textContent = "Next"
    nextButton.addEventListener("click", () => shiftCarousel(1))
  
    featuredSection.appendChild(prevButton)
    featuredSection.appendChild(nextButton)
  
    return featuredSection
  }
  
  // Function to handle carousel shifting
  function shiftCarousel(direction) {
    const carousel = document.querySelector(".featured-carousel")
    const cardWidth = 300 + 16 // card width + margin
    const currentPosition = Number.parseInt(carousel.style.transform.replace("translateX(", "")) || 0
    const newPosition = currentPosition - direction * cardWidth
    const maxShift = -(cardWidth * (carousel.children.length - 3)) // Show 3 cards at a time
  
    if (newPosition <= 0 && newPosition >= maxShift) {
      carousel.style.transform = `translateX(${newPosition}px)`
    }
  }
  
  // Function to populate category filter
  function populateCategoryFilter() {
    const categoryFilter = document.getElementById("category-filter")
    const categories = [...new Set(websites.map((website) => website.category))]
    categories.forEach((category) => {
      const option = document.createElement("option")
      option.value = category
      option.textContent = category
      categoryFilter.appendChild(option)
    })
  }
  
  // Update the initial setup
  function initialSetup() {
    const main = document.querySelector("main")
    const featuredWebsites = createFeaturedWebsites()
    main.insertBefore(featuredWebsites, main.firstChild)
  
    populateCategoryFilter()
    displayWebsites(websites)
    handleAutocomplete()
  }
  
  // Call initialSetup instead of individual functions
  initialSetup()
  
  