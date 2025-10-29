// DOM Elements
const adminBtn = document.getElementById('adminBtn');
const loginModal = document.getElementById('loginModal');
const confirmationModal = document.getElementById('confirmationModal');
const certificateFullModal = document.getElementById('certificateFullModal');
const iconPickerModal = document.getElementById('iconPickerModal');
const skillProgressModal = document.getElementById('skillProgressModal');
const projectModal = document.getElementById('projectModal');
const certificateImageModal = document.getElementById('certificateImageModal');
const closeBtns = document.querySelectorAll('.close');
const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');
const adminPanel = document.getElementById('adminPanel');
const logoutBtn = document.getElementById('logoutBtn');
const saveChangesBtn = document.getElementById('saveChangesBtn');
const uploadImageBtn = document.getElementById('uploadImageBtn');
const imageUpload = document.getElementById('imageUpload');
const addProjectBtn = document.getElementById('addProjectBtn');
const addCertificateBtn = document.getElementById('addCertificateBtn');
const addExperienceBtn = document.getElementById('addExperienceBtn');
const addSkillBtn = document.getElementById('addSkillBtn');
const addHobbyBtn = document.getElementById('addHobbyBtn');
const addContactBtn = document.getElementById('addContactBtn');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const iconGrid = document.getElementById('iconGrid');
const applyIconBtn = document.getElementById('applyIconBtn');
const iconImageUpload = document.getElementById('iconImageUpload');
const skillPercentage = document.getElementById('skillPercentage');
const applySkillBtn = document.getElementById('applySkillBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const uploadProjectImageBtn = document.getElementById('uploadProjectImageBtn');
const projectImageUpload = document.getElementById('projectImageUpload');
const uploadedImages = document.getElementById('uploadedImages');
const navLinks = document.querySelectorAll('.nav-link');
const certificateImageUpload = document.getElementById('certificateImageUpload');
const applyCertificateImageBtn = document.getElementById('applyCertificateImageBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmationMessage = document.getElementById('confirmationMessage');
const certificateFullImage = document.getElementById('certificateFullImage');
const deleteProjectInModalBtn = document.getElementById('deleteProjectInModalBtn');
const deleteCertificateInModalBtn = document.getElementById('deleteCertificateInModalBtn');

// State
let isAdmin = false;
let currentEditElement = null;
let currentIconElement = null;
let selectedIcon = null;
let currentSkillElement = null;
let currentProjectElement = null;
let currentCertificateElement = null;
let currentSlideIndex = 0;
let projectImages = {};
let certificateClickCount = {};
let elementToDelete = null;
let deleteCallback = null;

// Available icons
const availableIcons = [
    'fas fa-home', 'fas fa-user', 'fas fa-envelope', 'fas fa-phone', 'fas fa-map-marker-alt',
    'fas fa-camera', 'fas fa-hiking', 'fas fa-book', 'fas fa-music', 'fas fa-gamepad',
    'fas fa-plane', 'fas fa-car', 'fas fa-bicycle', 'fas fa-heart', 'fas fa-star',
    'fas fa-code', 'fas fa-laptop', 'fas fa-mobile-alt', 'fas fa-tablet-alt', 'fas fa-desktop',
    'fas fa-server', 'fas fa-cloud', 'fas fa-database', 'fas fa-lock', 'fas fa-key',
    'fas fa-chart-line', 'fas fa-chart-bar', 'fas fa-chart-pie', 'fas fa-coins', 'fas fa-shopping-cart',
    'fab fa-html5', 'fab fa-css3-alt', 'fab fa-js', 'fab fa-react', 'fab fa-vuejs',
    'fab fa-angular', 'fab fa-node-js', 'fab fa-python', 'fab fa-java', 'fab fa-php',
    'fab fa-git', 'fab fa-github', 'fab fa-gitlab', 'fab fa-docker', 'fab fa-aws',
    'fab fa-google', 'fab fa-microsoft', 'fab fa-apple', 'fab fa-linux', 'fab fa-android',
    'fas fa-palette', 'fas fa-pencil-ruler', 'fas fa-paint-brush', 'fas fa-eraser', 'fas fa-drafting-compass'
];

// Event Listeners
adminBtn.addEventListener('click', openLoginModal);
closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.closest('.modal').style.display = 'none';
    });
});
loginForm.addEventListener('submit', handleLogin);
logoutBtn.addEventListener('click', handleLogout);
saveChangesBtn.addEventListener('click', saveChanges);
uploadImageBtn.addEventListener('click', () => imageUpload.click());
imageUpload.addEventListener('change', handleImageUpload);
addProjectBtn.addEventListener('click', addNewProject);
addCertificateBtn.addEventListener('click', addNewCertificate);
addExperienceBtn.addEventListener('click', addNewExperience);
addSkillBtn.addEventListener('click', addNewSkill);
addHobbyBtn.addEventListener('click', addNewHobby);
addContactBtn.addEventListener('click', addNewContact);
applyIconBtn.addEventListener('click', applySelectedIcon);
iconImageUpload.addEventListener('change', handleIconImageUpload);
applySkillBtn.addEventListener('click', applySkillChange);
prevBtn.addEventListener('click', () => changeSlide(-1));
nextBtn.addEventListener('click', () => changeSlide(1));
uploadProjectImageBtn.addEventListener('click', () => projectImageUpload.click());
projectImageUpload.addEventListener('change', handleProjectImageUpload);
applyCertificateImageBtn.addEventListener('click', applyCertificateImageChange);
certificateImageUpload.addEventListener('change', handleCertificateImageUpload);
confirmDeleteBtn.addEventListener('click', confirmDelete);
cancelDeleteBtn.addEventListener('click', cancelDelete);
deleteProjectInModalBtn.addEventListener('click', () => {
    showDeleteConfirmation(currentProjectElement, () => {
        const projectId = currentProjectElement.getAttribute('data-project-id');
        if (projectId && projectImages[projectId]) {
            delete projectImages[projectId];
        }
        currentProjectElement.remove();
        projectModal.style.display = 'none';
        showNotification('Proyecto eliminado');
        checkEmptyStates();
    });
});
deleteCertificateInModalBtn.addEventListener('click', () => {
    showDeleteConfirmation(currentCertificateElement, () => {
        const certId = currentCertificateElement.getAttribute('data-cert-id');
        if (certId && certificateClickCount[certId]) {
            delete certificateClickCount[certId];
        }
        currentCertificateElement.remove();
        certificateImageModal.style.display = 'none';
        showNotification('Certificado eliminado');
        checkEmptyStates();
    });
});

// Navigation smooth scrolling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Functions
function openLoginModal() {
    loginModal.style.display = 'block';
    setTimeout(() => {
        passwordInput.focus();
    }, 100);
}

function closeLoginModal() {
    loginModal.style.display = 'none';
    passwordInput.value = '';
}

function handleLogin(e) {
    e.preventDefault();
    const password = passwordInput.value;
    
    if (password === '2001') {
        isAdmin = true;
        closeLoginModal();
        enableEditMode();
        showNotification('Sesión iniciada correctamente');
    } else {
        showNotification('Contraseña incorrecta', 'error');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

function handleLogout() {
    isAdmin = false;
    disableEditMode();
    showNotification('Sesión cerrada correctamente');
}

function enableEditMode() {
    adminPanel.classList.add('active');
    document.body.classList.add('admin-mode');
    applyEditModeToElements();
}

function applyEditModeToElements() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.contentEditable = true;
        setupEditControls(element);
    });
}

function setupEditControls(element) {
    const existingControls = element.querySelector('.edit-controls');
    if (existingControls) {
        existingControls.remove();
    }
    
    const editControls = document.createElement('div');
    editControls.className = 'edit-controls';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'edit-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.title = 'Eliminar elemento';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showDeleteConfirmation(element, () => {
            element.remove();
            showNotification('Elemento eliminado');
            checkEmptyStates();
        });
    });
    
    editControls.appendChild(deleteBtn);
    element.appendChild(editControls);
}

function disableEditMode() {
    adminPanel.classList.remove('active');
    document.body.classList.remove('admin-mode');
    
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.contentEditable = false;
        const editControls = element.querySelector('.edit-controls');
        if (editControls) {
            editControls.remove();
        }
    });
}

function showDeleteConfirmation(element, callback) {
    elementToDelete = element;
    deleteCallback = callback;
    confirmationModal.style.display = 'block';
}

function confirmDelete() {
    if (deleteCallback) {
        deleteCallback();
    }
    confirmationModal.style.display = 'none';
    elementToDelete = null;
    deleteCallback = null;
}

function cancelDelete() {
    confirmationModal.style.display = 'none';
    elementToDelete = null;
    deleteCallback = null;
}

function checkEmptyStates() {
    const skillsContainer = document.getElementById('skillsContainer');
    if (skillsContainer && !skillsContainer.querySelector('.skill-card')) {
        skillsContainer.innerHTML = `<div class="empty-state"><i class="fas fa-code"></i><p>No hay habilidades agregadas aún</p></div>`;
    }
    const projectsContainer = document.getElementById('projectsContainer');
    if (projectsContainer && !projectsContainer.querySelector('.project-card')) {
        projectsContainer.innerHTML = `<div class="empty-state"><i class="fas fa-project-diagram"></i><p>No hay proyectos agregados aún</p></div>`;
    }
    const certificatesContainer = document.getElementById('certificatesContainer');
    if (certificatesContainer && !certificatesContainer.querySelector('.certificate-card')) {
        certificatesContainer.innerHTML = `<div class="empty-state"><i class="fas fa-certificate"></i><p>No hay certificados agregados aún</p></div>`;
    }
    const hobbiesContainer = document.getElementById('hobbiesContainer');
    if (hobbiesContainer && !hobbiesContainer.querySelector('.hobby-card')) {
        hobbiesContainer.innerHTML = `<div class="empty-state"><i class="fas fa-heart"></i><p>No hay pasatiempos agregados aún</p></div>`;
    }
    const timelineContainer = document.getElementById('timelineContainer');
    if (timelineContainer && !timelineContainer.querySelector('.timeline-item')) {
        timelineContainer.innerHTML = `<div class="empty-state"><i class="fas fa-briefcase"></i><p>No hay experiencias agregadas aún</p></div>`;
    }
    const contactInfo = document.getElementById('contactInfo');
    if (contactInfo && !contactInfo.querySelector('.contact-item')) {
        contactInfo.innerHTML = `<div class="empty-state"><i class="fas fa-address-card"></i><p>No hay información de contacto agregada aún</p></div>`;
    }
}

function openIconPicker() {
    iconPickerModal.style.display = 'block';
    populateIconGrid();
}

function populateIconGrid() {
    iconGrid.innerHTML = '';
    availableIcons.forEach(iconClass => {
        const iconOption = document.createElement('div');
        iconOption.className = 'icon-option';
        iconOption.innerHTML = `<i class="${iconClass}"></i>`;
        iconOption.addEventListener('click', () => {
            document.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
            iconOption.classList.add('selected');
            selectedIcon = iconClass;
        });
        iconGrid.appendChild(iconOption);
    });
}

function applySelectedIcon() {
    if (currentIconElement && selectedIcon) {
        currentIconElement.setAttribute('data-icon', selectedIcon);
        currentIconElement.innerHTML = `<i class="${selectedIcon}"></i>`;
        showNotification('Icono actualizado correctamente');
        iconPickerModal.style.display = 'none';
    }
}

function handleIconImageUpload(e) {
    const file = e.target.files[0];
    if (file && currentIconElement) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            currentIconElement.innerHTML = `<img src="${imageUrl}" style="width: 100%; height: 100%; object-fit: contain;">`;
            currentIconElement.setAttribute('data-icon', 'custom-image');
            showNotification('Icono de imagen actualizado correctamente');
            iconPickerModal.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

function openSkillProgressModal() {
    const currentPercentage = currentSkillElement.querySelector('.skill-percentage').textContent;
    skillPercentage.value = parseInt(currentPercentage);
    skillProgressModal.style.display = 'block';
}

function applySkillChange() {
    const newPercentage = parseInt(skillPercentage.value);
    if (newPercentage >= 0 && newPercentage <= 100) {
        const progressBar = currentSkillElement.querySelector('.skill-progress-bar');
        const percentageDisplay = currentSkillElement.querySelector('.skill-percentage');
        
        progressBar.style.width = `${newPercentage}%`;
        percentageDisplay.textContent = `${newPercentage}%`;
        
        showNotification('Nivel de habilidad actualizado correctamente');
        skillProgressModal.style.display = 'none';
    } else {
        showNotification('Por favor, ingresa un valor entre 0 y 100', 'error');
    }
}

function openProjectModal() {
    const projectId = currentProjectElement.getAttribute('data-project-id');
    const projectTitle = currentProjectElement.querySelector('.project-title').textContent;
    const projectDescription = currentProjectElement.querySelector('.project-description').textContent;
    const projectTags = Array.from(currentProjectElement.querySelectorAll('.tag')).map(tag => tag.textContent);
    
    document.getElementById('projectModalTitle').textContent = projectTitle;
    document.getElementById('projectModalDescription').textContent = projectDescription;
    
    const tagsContainer = document.getElementById('projectModalTags');
    tagsContainer.innerHTML = '';
    projectTags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
    
    setupCarousel(projectImages[projectId] || []);
    document.getElementById('projectImagesUpload').style.display = isAdmin ? 'block' : 'none';
    document.getElementById('deleteProjectInModalContainer').style.display = isAdmin ? 'block' : 'none';
    projectModal.style.display = 'block';
}

function setupCarousel(images) {
    const carouselContainer = document.getElementById('carouselContainer');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    carouselContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    if (images.length === 0) {
        carouselContainer.innerHTML = `<div class="empty-state"><i class="fas fa-image"></i><p>No hay imágenes</p></div>`;
    } else {
        images.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `<img src="${src}" alt="Project Image ${index + 1}">`;
            carouselContainer.appendChild(slide);
            
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    currentSlideIndex = 0;
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex += direction;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

function handleProjectImageUpload(e) {
    const files = Array.from(e.target.files);
    const projectId = currentProjectElement.getAttribute('data-project-id');
    
    if (!projectImages[projectId]) {
        projectImages[projectId] = [];
    }
    
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            projectImages[projectId].push(imageUrl);
            
            if (projectImages[projectId].length === 1) {
                const projectImage = currentProjectElement.querySelector('.project-image');
                projectImage.innerHTML = `
                    <img src="${imageUrl}" alt="Project Image">
                    <button class="delete-project-image" title="Eliminar imagen">×</button>
                `;
                
                const deleteBtn = projectImage.querySelector('.delete-project-image');
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showDeleteConfirmation(projectImage, () => {
                        projectImage.innerHTML = `<div class="empty-state"><i class="fas fa-image"></i><p>Sin imagen</p></div><button class="delete-project-image" title="Eliminar imagen">×</button>`;
                        projectImages[projectId] = [];
                        showNotification('Imagen eliminada');
                    });
                });
            }
            
            if (projectModal.style.display === 'block') {
                setupCarousel(projectImages[projectId]);
            }
            
            const thumbnail = document.createElement('div');
            thumbnail.className = 'uploaded-image';
            thumbnail.innerHTML = `
                <img src="${imageUrl}" alt="Uploaded Image">
                <button class="remove-image" data-index="${projectImages[projectId].length - 1}">×</button>
            `;
            
            thumbnail.querySelector('.remove-image').addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                projectImages[projectId].splice(index, 1);
                thumbnail.remove();
                
                if (projectModal.style.display === 'block') {
                    setupCarousel(projectImages[projectId]);
                }
                
                showNotification('Imagen eliminada');
            });
            
            uploadedImages.appendChild(thumbnail);
            showNotification('Imagen subida correctamente');
        };
        reader.readAsDataURL(file);
    });
    
    projectImageUpload.value = '';
}

function openCertificateImageModal() {
    certificateImageModal.style.display = 'block';
}

function handleCertificateImageUpload(e) {
    const file = e.target.files[0];
    if (file && currentCertificateElement) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.createElement('img');
            preview.src = event.target.result;
            preview.style.maxWidth = '100%';
            preview.style.maxHeight = '200px';
            preview.style.marginTop = '1rem';
            preview.style.borderRadius = '5px';
            
            const existingPreview = certificateImageModal.querySelector('img');
            if (existingPreview) existingPreview.remove();
            
            certificateImageModal.querySelector('.modal-content').appendChild(preview);
        };
        reader.readAsDataURL(file);
    }
}

function applyCertificateImageChange() {
    const file = certificateImageUpload.files[0];
    if (file && currentCertificateElement) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            const certificateImage = currentCertificateElement.querySelector('.certificate-image');
            certificateImage.innerHTML = `<img src="${imageUrl}" alt="Certificate">`;
            showNotification('Imagen del certificado actualizada correctamente');
            certificateImageModal.style.display = 'none';
            
            certificateImageUpload.value = '';
            const preview = certificateImageModal.querySelector('img');
            if (preview) preview.remove();
        };
        reader.readAsDataURL(file);
    }
}

function saveChanges() {
    showNotification('Cambios guardados correctamente');
    
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        const id = element.id;
        const content = element.innerHTML;
        localStorage.setItem(id, content);
    });

    const skillProgressElements = document.querySelectorAll('.skill-progress');
    skillProgressElements.forEach(element => {
        const skillName = element.getAttribute('data-skill');
        const percentage = element.querySelector('.skill-percentage').textContent;
        localStorage.setItem(`skill-${skillName}`, percentage);
    });

    localStorage.setItem('projectImages', JSON.stringify(projectImages));
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            
            if (currentEditElement && currentEditElement.tagName === 'IMG') {
                currentEditElement.src = imageUrl;
                showNotification('Imagen actualizada correctamente');
            } else {
                showNotification('Imagen cargada. Selecciona una imagen para reemplazarla.');
            }
        };
        reader.readAsDataURL(file);
    }
}

function addNewProject() {
    const projectsContainer = document.getElementById('projectsContainer');
    const projectId = Date.now().toString();
    
    const emptyState = projectsContainer.querySelector('.empty-state');
    if (emptyState) emptyState.remove();
    
    const newProject = document.createElement('div');
    newProject.className = 'project-card editable';
    newProject.setAttribute('data-project-id', projectId);
    newProject.innerHTML = `
        <div class="project-image">
            <div class="empty-state"><i class="fas fa-image"></i><p>Sin imagen</p></div>
            <button class="delete-project-image" title="Eliminar imagen">×</button>
        </div>
        <div class="project-content">
            <h3 class="project-title">Nuevo Proyecto</h3>
            <p class="project-description">Descripción del nuevo proyecto</p>
            <div class="project-tags"><span class="tag">Tecnología</span><span class="tag">Framework</span></div>
        </div>
    `;
    
    projectsContainer.appendChild(newProject);
    projectImages[projectId] = [];
    
    if (isAdmin) {
        newProject.contentEditable = true;
        setupEditControls(newProject);
    }
    
    newProject.addEventListener('click', (e) => {
        if (!e.target.closest('.edit-controls') && !e.target.closest('.delete-project-image')) {
            currentProjectElement = newProject;
            openProjectModal();
        }
    });

    const deleteBtnImg = newProject.querySelector('.delete-project-image');
    deleteBtnImg.addEventListener('click', (e) => {
        e.stopPropagation();
        showDeleteConfirmation(newProject.querySelector('.project-image'), () => {
            const projectImage = newProject.querySelector('.project-image');
            projectImage.innerHTML = `<div class="empty-state"><i class="fas fa-image"></i><p>Sin imagen</p></div><button class="delete-project-image" title="Eliminar imagen">×</button>`;
            projectImages[projectId] = [];
            showNotification('Imagen eliminada');
        });
    });
    
    showNotification('Nuevo proyecto añadido');
}

function addNewCertificate() {
    const certificatesContainer = document.getElementById('certificatesContainer');
    const certId = Date.now().toString();
    
    const emptyState = certificatesContainer.querySelector('.empty-state');
    if (emptyState) emptyState.remove();
    
    const newCertificate = document.createElement('div');
    newCertificate.className = 'certificate-card editable';
    newCertificate.setAttribute('data-cert-id', certId);
    newCertificate.innerHTML = `
        <div class="certificate-image">
            <div class="empty-state"><i class="fas fa-certificate"></i><p>Sin imagen</p></div>
        </div>
        <div class="certificate-content">
            <h3 class="certificate-title">Nuevo Certificado</h3>
            <p class="certificate-issuer">Institución</p>
            <p class="certificate-date">Fecha</p>
        </div>
    `;
    
    certificatesContainer.appendChild(newCertificate);
    certificateClickCount[certId] = 0;
    
    if (isAdmin) {
        newCertificate.contentEditable = true;
        setupEditControls(newCertificate);
    }

    newCertificate.addEventListener('click', (e) => {
        if (!e.target.closest('.edit-controls')) {
            if (isAdmin) {
                const certId = newCertificate.getAttribute('data-cert-id');
                certificateClickCount[certId] = (certificateClickCount[certId] || 0) + 1;
                
                if (certificateClickCount[certId] === 3) {
                    currentCertificateElement = newCertificate;
                    openCertificateImageModal();
                    certificateClickCount[certId] = 0;
                }
                
                setTimeout(() => {
                    if (certificateClickCount[certId] < 3) {
                        certificateClickCount[certId] = 0;
                    }
                }, 2000);
            } else {
                const img = newCertificate.querySelector('.certificate-image img');
                if (img && img.src && !img.src.includes('fa-certificate')) {
                    certificateFullImage.src = img.src;
                    certificateFullModal.style.display = 'block';
                }
            }
        }
    });
    
    showNotification('Nuevo certificado añadido');
}

function addNewExperience() {
    const timelineContainer = document.getElementById('timelineContainer');
    const timelineItems = timelineContainer.querySelectorAll('.timeline-item');
    const isLeft = timelineItems.length % 2 === 0;
    
    const emptyState = timelineContainer.querySelector('.empty-state');
    if (emptyState) emptyState.remove();
    
    const newExperience = document.createElement('div');
    newExperience.className = `timeline-item ${isLeft ? 'left' : 'right'} editable`;
    newExperience.innerHTML = `
        <div class="timeline-content">
            <h3>Nueva Posición</h3>
            <h4>Nombre de la Empresa</h4>
            <p>Año de inicio - Año de fin</p>
            <p>Descripción de las responsabilidades y logros en esta posición.</p>
        </div>
    `;
    
    timelineContainer.appendChild(newExperience);
    
    if (isAdmin) {
        newExperience.contentEditable = true;
        setupEditControls(newExperience);
    }
    
    showNotification('Nueva experiencia añadida');
}

function addNewSkill() {
    const skillsContainer = document.getElementById('skillsContainer');
    const skillId = Date.now().toString();
    
    const emptyState = skillsContainer.querySelector('.empty-state');
    if (emptyState) emptyState.remove();
    
    const newSkill = document.createElement('div');
    newSkill.className = 'skill-card editable';
    newSkill.setAttribute('data-skill', skillId);
    newSkill.innerHTML = `
        <div class="skill-icon" data-icon="fas fa-code"><i class="fas fa-code"></i></div>
        <h3>Nueva Habilidad</h3>
        <p>Descripción de la habilidad</p>
        <div class="skill-progress" data-skill="${skillId}">
            <div class="skill-progress-bar" style="width: 50%"></div>
            <span class="skill-percentage">50%</span>
        </div>
    `;
    
    skillsContainer.appendChild(newSkill);
    
    if (isAdmin) {
        newSkill.contentEditable = true;
        setupEditControls(newSkill);
    }

    const icon = newSkill.querySelector('.skill-icon');
    icon.addEventListener('click', (e) => {
        if (isAdmin) {
            e.stopPropagation();
            currentIconElement = icon;
            openIconPicker();
        }
    });

    const progress = newSkill.querySelector('.skill-progress');
    progress.addEventListener('click', (e) => {
        if (isAdmin) {
            e.stopPropagation();
            currentSkillElement = progress;
            openSkillProgressModal();
        }
    });
    
    showNotification('Nueva habilidad añadida');
}

function addNewHobby() {
    const hobbiesContainer = document.getElementById('hobbiesContainer');
    
    const emptyState = hobbiesContainer.querySelector('.empty-state');
    if (emptyState) emptyState.remove();
    
    const newHobby = document.createElement('div');
    newHobby.className = 'hobby-card editable';
    newHobby.innerHTML = `
        <div class="hobby-icon" data-icon="fas fa-star"><i class="fas fa-star"></i></div>
        <h3>Nuevo Pasatiempo</h3>
    `;
    
    hobbiesContainer.appendChild(newHobby);
    
    if (isAdmin) {
        newHobby.contentEditable = true;
        setupEditControls(newHobby);
    }

    const icon = newHobby.querySelector('.hobby-icon');
    icon.addEventListener('click', (e) => {
        if (isAdmin) {
            e.stopPropagation();
            currentIconElement = icon;
            openIconPicker();
        }
    });
    
    showNotification('Nuevo pasatiempo añadido');
}

function addNewContact() {
    const contactInfo = document.getElementById('contactInfo');
    const contactId = Date.now().toString();
    
    const emptyState = contactInfo.querySelector('.empty-state');
    if (emptyState) emptyState.remove();
    
    const newContact = document.createElement('div');
    newContact.className = 'contact-item editable';
    newContact.innerHTML = `
        <div class="contact-icon" data-icon="fas fa-envelope"><i class="fas fa-envelope"></i></div>
        <p class="editable">contacto@ejemplo.com</p>
    `;
    
    contactInfo.appendChild(newContact);
    
    if (isAdmin) {
        newContact.contentEditable = true;
        setupEditControls(newContact);
    }

    const icon = newContact.querySelector('.contact-icon');
    icon.addEventListener('click', (e) => {
        if (isAdmin) {
            e.stopPropagation();
            currentIconElement = icon;
            openIconPicker();
        }
    });
    
    showNotification('Nuevo contacto añadido');
}

function showNotification(message, type = 'success') {
    notificationText.textContent = message;
    notification.style.backgroundColor = type === 'error' ? '#e74c3c' : '#2ecc71';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function loadSavedContent() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        const id = element.id;
        const savedContent = localStorage.getItem(id);
        if (savedContent) element.innerHTML = savedContent;
    });

    const skillProgressElements = document.querySelectorAll('.skill-progress');
    skillProgressElements.forEach(element => {
        const skillName = element.getAttribute('data-skill');
        const savedPercentage = localStorage.getItem(`skill-${skillName}`);
        if (savedPercentage) {
            const progressBar = element.querySelector('.skill-progress-bar');
            const percentageDisplay = element.querySelector('.skill-percentage');
            if (progressBar && percentageDisplay) {
                progressBar.style.width = `${savedPercentage}%`;
                percentageDisplay.textContent = `${savedPercentage}%`;
            }
        }
    });

    const savedProjectImages = localStorage.getItem('projectImages');
    if (savedProjectImages) {
        try {
            projectImages = JSON.parse(savedProjectImages);
        } catch (e) {
            console.error('Error loading project images:', e);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSavedContent();
    
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            if (isAdmin) {
                currentEditElement = img;
                showNotification('Imagen seleccionada. Usa el botón "Subir Imagen" para reemplazarla.');
            }
        });
    });
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === loginModal) closeLoginModal();
    if (e.target === confirmationModal) cancelDelete();
    if (e.target === certificateFullModal) certificateFullModal.style.display = 'none';
    if (e.target === iconPickerModal) iconPickerModal.style.display = 'none';
    if (e.target === skillProgressModal) skillProgressModal.style.display = 'none';
    if (e.target === projectModal) projectModal.style.display = 'none';
    if (e.target === certificateImageModal) {
        certificateImageModal.style.display = 'none';
        const preview = certificateImageModal.querySelector('img');
        if (preview) preview.remove();
    }
});

passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        loginForm.dispatchEvent(new Event('submit'));
    }
});