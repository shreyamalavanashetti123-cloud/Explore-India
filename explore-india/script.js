/* ==========================================
   EXPLORE INDIA - SCRIPT.JS
   Interactive logic, filter engines, live
   calculators, modals, and carousel systems.
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Preloader Screen
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      setTimeout(() => {
        preloader.remove();
      }, 600);
    }
  });
  // Fallback: remove preloader if load event takes too long
  setTimeout(() => {
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }
  }, 3000);


  // 2. Sticky Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightNavOnScroll();
  });


  // 3. Mobile Navigation Menu Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }


  // 4. Highlight Nav Link on Scroll
  function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }


  // 5. Destination Data & Popups
  const destinationData = {
    mysore: {
      title: "Mysore Palace",
      price: 4999,
      img: "assets/mysore.png",
      rating: "4.8 (1.2k reviews)",
      duration: "3 Days / 2 Nights",
      time: "Oct - Mar",
      activity: "Easy Sightseeing",
      desc: "Experience the royal heritage of the Kingdom of Mysore. Visit the historic Amba Vilas Palace (Mysore Palace), which glows magnificently with over 97,000 bulbs in the evening. Explore Chamundi Hills, Brindavan Gardens, and the bustling spice-scented Devaraja Market.",
      highlights: ["VIP Palace Entry & Audio Guide", "Spectacular Brindavan Garden Light Show", "Sightseeing at Chamundi Hill Temple", "Traditional royal welcome and meals"]
    },
    coorg: {
      title: "Coorg Hills",
      price: 6499,
      img: "assets/coorg.png",
      rating: "4.7 (950 reviews)",
      duration: "4 Days / 3 Nights",
      time: "Nov - May",
      activity: "Moderate Trekking",
      desc: "Immerse yourself in India's coffee cup. Coorg offers stunning vistas of green misty hills, sprawling estate walks, and beautiful waterfalls like Abbey Falls. Tour historic Madikeri Fort, visit the Golden Temple Buddhist Monastery, and enjoy local Kodava cuisine.",
      highlights: ["Interactive Coffee Estate Tour & Tasting", "Abbey Falls & Raja's Seat Sightseeing", "Bylakuppe Golden Temple visit", "Organic spice shopping guidance"]
    },
    hampi: {
      title: "Hampi Ruins",
      price: 5499,
      img: "assets/hampi.png",
      rating: "4.9 (870 reviews)",
      duration: "3 Days / 2 Nights",
      time: "Oct - Feb",
      activity: "Biking / Sightseeing",
      desc: "Step back in time to the golden age of the Vijayanagara Empire. Wander among the surreal bouldered landscapes, ancient temples, royal bath houses, and the iconic stone chariot of Vittala Temple. Cross the Tungabhadra River on a traditional coracle boat.",
      highlights: ["Certified Historian-guided Monument Tour", "Coracle boat ride on Tungabhadra River", "Sunrise trek at Matanga Hill", "Traditional Karnataka organic meals"]
    },
    goa: {
      title: "Goa Beaches",
      price: 7999,
      img: "assets/goa.png",
      rating: "4.7 (2.5k reviews)",
      duration: "4 Days / 3 Nights",
      time: "Nov - Feb",
      activity: "Water Sports",
      desc: "Savor the absolute perfect holiday vibes on Goa's scenic shores. Relax on white sand beaches, visit historic Portuguese forts (Aguada and Chapora), try thrill sports like parasailing, and explore colonial churches in Old Goa.",
      highlights: ["Complimentary Jet Ski / Parasailing ride", "Sunset catamaran cruise with drinks", "Old Goa Heritage Churches guided trip", "Beachside shack dinner discount"]
    },
    kerala: {
      title: "Kerala Backwaters",
      price: 8999,
      img: "assets/kerala.png",
      rating: "4.9 (1.8k reviews)",
      duration: "5 Days / 4 Nights",
      time: "Sep - Mar",
      activity: "Easy Relaxing",
      desc: "Discover 'God's Own Country' in the most tranquil way possible. Relax on a private wooden houseboat floating down Vembanad Lake in Kumarakom and Alleppey. Witness Chinese fishing nets, lush coconut groves, and learn traditional Ayurvedic treatments.",
      highlights: ["Overnight Luxury Houseboat stay", "Ayurvedic wellness therapy session", "Traditional Sadhya feast on banana leaf", "Cochin Fort & Spice Market guided tour"]
    },
    manali: {
      title: "Manali Valley",
      price: 9499,
      img: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
      rating: "4.8 (1.4k reviews)",
      duration: "6 Days / 5 Nights",
      time: "Oct - Jun",
      activity: "High Adventure",
      desc: "The ultimate Himalayan paradise. Manali is a gateway to snowy mountain passes, apple orchards, and roaring river rapids. Experience Solang Valley adventures, visit historic Hadimba Temple, and travel through the state-of-the-art Atal Tunnel.",
      highlights: ["Atal Tunnel & Solang Valley day tour", "River Rafting & Snow activities guide", "Scenic bonfire night with live music", "Cozy wooden cottage stays with views"]
    }
  };

  const detailsModal = document.getElementById('details-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalRating = document.getElementById('modal-rating');
  const modalDuration = document.getElementById('modal-duration');
  const modalTime = document.getElementById('modal-time');
  const modalActivity = document.getElementById('modal-activity');
  const modalDesc = document.getElementById('modal-desc');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalPrice = document.getElementById('modal-price');
  const modalClose = document.getElementById('modal-close');
  const modalBookBtn = document.getElementById('modal-book-now');
  
  let currentModalDestKey = '';

  // Attach click events to "View Details" buttons
  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const destKey = btn.getAttribute('data-destination');
      const data = destinationData[destKey];
      
      if (data) {
        currentModalDestKey = destKey;
        modalImg.src = data.img;
        modalImg.alt = data.title;
        modalTitle.textContent = data.title;
        modalRating.innerHTML = `<i class="fa-solid fa-star"></i> ${data.rating}`;
        modalDuration.textContent = data.duration;
        modalTime.textContent = data.time;
        modalActivity.textContent = data.activity;
        modalDesc.textContent = data.desc;
        modalPrice.textContent = `₹${data.price.toLocaleString('en-IN')}`;
        
        // Populate Highlights
        modalHighlights.innerHTML = '';
        data.highlights.forEach(highlight => {
          const li = document.createElement('li');
          li.innerHTML = `<i class="fa-solid fa-check"></i> ${highlight}`;
          modalHighlights.appendChild(li);
        });

        // Show Modal
        detailsModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
      }
    });
  });

  // Close Modal Actions
  const closeModalFunc = () => {
    detailsModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Unlock background scroll
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModalFunc);
  }

  window.addEventListener('click', (e) => {
    if (e.target === detailsModal) {
      closeModalFunc();
    }
  });

  // Modal "Book Now" CTA Action
  if (modalBookBtn && modalBookBtn) {
    modalBookBtn.addEventListener('click', () => {
      closeModalFunc();
      
      // Auto-populate booking form and scroll
      const bookDestDropdown = document.getElementById('book-dest');
      if (bookDestDropdown && currentModalDestKey) {
        bookDestDropdown.value = currentModalDestKey;
        // Trigger change event to update price calculations
        bookDestDropdown.dispatchEvent(new Event('change'));
      }
      
      // Scroll smoothly to booking
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


  // 6. Real-time Destination Search / Filter
  const searchInput = document.getElementById('dest-search');
  const searchBtn = document.getElementById('search-btn');
  const destCards = document.querySelectorAll('.dest-card');
  const noResults = document.getElementById('no-results');

  const filterDestinations = () => {
    const query = searchInput.value.toLowerCase().trim();
    let matchCount = 0;

    destCards.forEach(card => {
      const name = card.getAttribute('data-name').toLowerCase();
      const title = card.querySelector('.dest-title').textContent.toLowerCase();
      const desc = card.querySelector('.dest-desc').textContent.toLowerCase();

      if (name.includes(query) || title.includes(query) || desc.includes(query)) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (matchCount === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  };

  if (searchInput) {
    searchInput.addEventListener('input', filterDestinations);
  }
  if (searchBtn) {
    searchBtn.addEventListener('click', filterDestinations);
  }


  // 7. Packages Section "Book Now" Triggers
  const pkgTriggers = document.querySelectorAll('.book-pkg-trigger');
  pkgTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const dest = trigger.getAttribute('data-dest');
      
      // Auto populate fields
      const bookDestDropdown = document.getElementById('book-dest');
      if (bookDestDropdown) {
        bookDestDropdown.value = dest;
        bookDestDropdown.dispatchEvent(new Event('change'));
      }

      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // 8. Booking Form Cost Calculator
  const bookForm = document.getElementById('booking-form');
  const destDropdown = document.getElementById('book-dest');
  const guestsInput = document.getElementById('book-guests');
  const hotelDropdown = document.getElementById('book-hotel');

  const summaryBase = document.getElementById('summary-base');
  const summaryAddon = document.getElementById('summary-addon');
  const summaryGuests = document.getElementById('summary-guests');
  const summaryTotal = document.getElementById('summary-total');

  const updateBookingCost = () => {
    if (!destDropdown || !guestsInput || !hotelDropdown) return;

    const selectedOption = destDropdown.options[destDropdown.selectedIndex];
    const guests = parseInt(guestsInput.value) || 1;
    const hotelOption = hotelDropdown.options[hotelDropdown.selectedIndex];

    let baseCost = 0;
    if (selectedOption && selectedOption.value) {
      baseCost = parseFloat(selectedOption.getAttribute('data-price')) || 0;
    }

    let hotelAddon = 0;
    if (hotelOption) {
      hotelAddon = parseFloat(hotelOption.getAttribute('data-addon')) || 0;
    }

    const calculatedTotal = (baseCost + hotelAddon) * guests;

    // Update Text Outputs
    summaryBase.textContent = baseCost > 0 ? `₹${baseCost.toLocaleString('en-IN')}` : '₹0';
    summaryAddon.textContent = hotelAddon > 0 ? `+₹${hotelAddon.toLocaleString('en-IN')}` : '₹0';
    summaryGuests.textContent = `x ${guests}`;
    summaryTotal.textContent = `₹${calculatedTotal.toLocaleString('en-IN')}`;
  };

  if (destDropdown) destDropdown.addEventListener('change', updateBookingCost);
  if (guestsInput) guestsInput.addEventListener('input', updateBookingCost);
  if (hotelDropdown) hotelDropdown.addEventListener('change', updateBookingCost);


  // 9. Booking Form Submission & Confirmation Ticket
  const ticketModal = document.getElementById('ticket-modal');
  const ticketPassenger = document.getElementById('ticket-passenger');
  const ticketNumber = document.getElementById('ticket-number');
  const ticketDestination = document.getElementById('ticket-destination');
  const ticketDate = document.getElementById('ticket-date');
  const ticketGuests = document.getElementById('ticket-guests');
  const ticketStay = document.getElementById('ticket-stay');
  const ticketPrice = document.getElementById('ticket-price');
  const ticketCloseBtn = document.getElementById('ticket-close');

  if (bookForm) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Form validation
      const name = document.getElementById('book-name').value.trim();
      const email = document.getElementById('book-email').value.trim();
      const dest = destDropdown.value;
      const dateVal = document.getElementById('book-date').value;
      const guests = guestsInput.value;

      if (!name) {
        alert('Please enter your full name.');
        return;
      }
      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }
      if (!dest) {
        alert('Please select a travel destination.');
        return;
      }
      if (!dateVal) {
        alert('Please select a travel date.');
        return;
      }
      if (guests < 1) {
        alert('Guests count must be at least 1.');
        return;
      }

      // Successful Booking Details Creation
      const selectedOption = destDropdown.options[destDropdown.selectedIndex];
      const hotelOption = hotelDropdown.options[hotelDropdown.selectedIndex];
      const baseCost = parseFloat(selectedOption.getAttribute('data-price')) || 0;
      const hotelAddon = parseFloat(hotelOption.getAttribute('data-addon')) || 0;
      const totalCost = (baseCost + hotelAddon) * parseInt(guests);

      // Map Date (YYYY-MM-DD -> DD-Month-YYYY)
      const dateObj = new Date(dateVal);
      const formattedDate = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

      // Generate Ticket Code
      const ticketId = 'IND-' + Math.floor(1000000 + Math.random() * 9000000);

      // Populate Ticket Layout
      ticketPassenger.textContent = name;
      ticketNumber.textContent = ticketId;
      ticketDestination.textContent = selectedOption.text.split('(')[0].trim();
      ticketDate.textContent = formattedDate;
      ticketGuests.textContent = guests === '1' ? '1 Guest' : `${guests} Guests`;
      ticketStay.textContent = hotelOption.text.split('(')[0].trim();
      ticketPrice.textContent = `₹${totalCost.toLocaleString('en-IN')}`;

      // Open Ticket Modal
      ticketModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close Boarding Ticket Modal
  if (ticketCloseBtn) {
    ticketCloseBtn.addEventListener('click', () => {
      ticketModal.classList.remove('active');
      document.body.style.overflow = 'auto';
      // Reset Booking form
      if (bookForm) {
        bookForm.reset();
        updateBookingCost();
      }
    });
  }


  // 10. Photo Gallery Filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active classes
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterVal === 'all' || itemCategory === filterVal) {
          item.style.display = 'block';
          // Force layout refresh animation
          item.style.animation = 'none';
          item.offsetHeight; // trigger reflow
          item.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });


  // 11. Photo Lightbox Modal
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-desc');

      if (src) {
        lightboxImg.src = src;
        lightboxImg.alt = title || 'Enlarged photo';
        lightboxTitle.textContent = title || '';
        lightboxDesc.textContent = desc || '';
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightboxFunc = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightboxFunc);
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightboxFunc();
      }
    });
  }


  // 12. Customer Reviews Carousel Slider
  const track = document.getElementById('reviews-track');
  const slides = document.querySelectorAll('.review-slide');
  const nextBtn = document.getElementById('rev-next');
  const prevBtn = document.getElementById('rev-prev');
  const dotsContainer = document.getElementById('reviews-dots');
  
  let currentSlideIndex = 0;
  let slideInterval;

  const updateCarouselPosition = () => {
    if (!track) return;
    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    // Update active dot
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlideIndex);
    });
  };

  const nextSlide = () => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateCarouselPosition();
  };

  const prevSlide = () => {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateCarouselPosition();
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 5000); // Shift every 5s
  };

  const stopAutoSlide = () => {
    if (slideInterval) clearInterval(slideInterval);
  };

  // Generate Navigation Dots
  if (dotsContainer && slides.length > 0) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentSlideIndex = idx;
        updateCarouselPosition();
        startAutoSlide();
      });
      dotsContainer.appendChild(dot);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoSlide();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoSlide();
    });
  }

  // Hover pauses auto sliding
  const carouselContainer = document.querySelector('.reviews-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
  }

  // Start sliding on load
  if (slides.length > 0) {
    startAutoSlide();
  }


  // 13. Scroll Fade Entrance Animations (Intersection Observer)
  const reveals = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window && reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Animates only once
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(element => revealObserver.observe(element));
  } else {
    // Fallback for older browsers
    reveals.forEach(el => el.classList.add('active'));
  }


  // 14. Contact Form Interaction Handlers
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !subject || !message) {
        alert('Please fill out all contact form fields.');
        return;
      }

      if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      alert(`Thank you, ${name}! Your inquiry has been sent successfully. Our support desk will reach out shortly.`);
      contactForm.reset();
    });
  }


  // 15. Newsletter Form Interaction Handler
  const newsForm = document.getElementById('newsletter-form');
  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('news-email').value.trim();

      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      alert('Subscription Successful! Welcome to the Explore India travel family.');
      newsForm.reset();
    });
  }

});
