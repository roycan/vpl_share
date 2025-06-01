/**
 * VPL for CS Educators - JavaScript
 * A vanilla JavaScript implementation for teaching web development basics
 */

// DOM Elements
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const implTabButtons = document.querySelectorAll('.implementation-tabs .tab-button');
const implTabPanels = document.querySelectorAll('.tab-panel');
const templateTabButtons = document.querySelectorAll('.templates-tabs .tab-button');
const templateTabPanes = document.querySelectorAll('#vpl-templates .tab-pane');
const faqQuestions = document.querySelectorAll('.faq-question');
const copyButtons = document.querySelectorAll('.copy-button');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const header = document.querySelector('.site-header');
const yearElement = document.getElementById('current-year');

// Set current year in footer
yearElement.textContent = new Date().getFullYear();

// Mobile Menu Toggle
mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Implementation Guide Tabs
console.log('Implementation Guide tab script loaded');
document.addEventListener('DOMContentLoaded', function () {
  const tabButtons = document.querySelectorAll('.implementation-tabs .tab-button');
  const tabPanels = document.querySelectorAll('.implementation-tabs .tab-panel');
  console.log('Found tabButtons:', tabButtons.length);
  console.log('Found tabPanels:', tabPanels.length);

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      console.log('Tab clicked:', btn.getAttribute('data-tab'));
      // Remove active from all buttons and panels
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      // Add active to clicked button and corresponding panel
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      const panel = document.getElementById(tab + '-panel');
      if (panel) {
        panel.classList.add('active');
        console.log('Activated panel:', tab + '-panel');
      } else {
        console.warn('Panel not found for tab:', tab + '-panel');
      }
    });
  });
});

// VPL Template Tabs
templateTabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the tab ID from data attribute
    const tabId = button.getAttribute('data-tab');
    
    // Remove active class from all buttons and panes
    templateTabButtons.forEach(btn => btn.classList.remove('active'));
    templateTabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Add active class to clicked button and corresponding pane
    button.classList.add('active');
    document.getElementById(`${tabId}-tab`).classList.add('active');
  });
});

// FAQ Accordion
faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    // Toggle active class on the question
    question.classList.toggle('active');
    
    // Get the answer element (next sibling)
    const answer = question.nextElementSibling;
    
    // Toggle active class on the answer
    answer.classList.toggle('active');
  });
});

// Copy to Clipboard functionality
copyButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the code text
    const codeBlock = button.parentElement;
    const codeText = codeBlock.querySelector('code').textContent;
    
    // Copy to clipboard
    navigator.clipboard.writeText(codeText).then(() => {
      // Show copied state
      button.classList.add('copied');
      const icon = button.querySelector('i');
      icon.classList.remove('fa-clipboard');
      icon.classList.add('fa-check');
      
      // Reset after 2 seconds
      setTimeout(() => {
        button.classList.remove('copied');
        icon.classList.remove('fa-check');
        icon.classList.add('fa-clipboard');
      }, 2000);
    });
  });
});

// Scrollspy functionality
function updateActiveLink() {
  const scrollPosition = window.scrollY + 100; // Offset for header
  
  // Get all sections
  const sections = document.querySelectorAll('section[id]');
  
  // Find the section that is currently in view
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  // Update active link in navigation
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').substring(1); // Remove #
    if (href === current) {
      link.classList.add('active');
    }
  });
  
  // Update header shadow on scroll
  if (scrollPosition > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Listen for scroll events
window.addEventListener('scroll', updateActiveLink);

// Initialize active link on page load
document.addEventListener('DOMContentLoaded', () => {
  updateActiveLink();
  
  // Smooth scroll to section if URL contains hash
  if (window.location.hash) {
    const targetSection = document.querySelector(window.location.hash);
    if (targetSection) {
      // Add a slight delay to ensure DOM is fully loaded
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
});

// Templates Accordion Logic
const templateAccordionHeaders = document.querySelectorAll('.templates-accordion .accordion-header');
const templateAccordionPanels = document.querySelectorAll('.templates-accordion .accordion-panel');

templateAccordionHeaders.forEach(header => {
  header.addEventListener('click', function () {
    const isActive = header.classList.contains('active');
    console.log('Accordion header clicked:', header.textContent.trim(), 'Active:', isActive);
    // Close all panels
    templateAccordionHeaders.forEach(h => h.classList.remove('active'));
    templateAccordionPanels.forEach(p => p.style.display = 'none');
    if (!isActive) {
      header.classList.add('active');
      const panel = header.nextElementSibling;
      if (panel) {
        panel.style.display = 'block';
        console.log('Opened panel for:', header.textContent.trim());
      }
    } else {
      console.log('Closed panel for:', header.textContent.trim());
    }
  });
});
// On page load, ensure all panels are closed
window.addEventListener('DOMContentLoaded', () => {
  templateAccordionPanels.forEach(p => p.style.display = 'none');
});