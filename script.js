// Dummy Data for Schematics
const dummyData = [
    {
        id: 1,
        name: "Hydraulic Lift Assembly",
        image: "schematics/Cable Roller Assembly.jpg",
        imageSize: "512x256",
        associatedModels: ["Jerr-Dan", "Century Steel Carrier"],
        partCount: 45,
        needsAttention: true,
        lastEditedBy: "john.doe",
        lastEditedDate: new Date("2024-01-15"),
        published: true
    },
    {
        id: 2,
        name: "Winch Control System",
        image: "schematics/Winch Clutch Control .jpg",
        imageSize: "1920x1440",
        associatedModels: ["Jerr-Dan"],
        partCount: 32,
        needsAttention: false,
        lastEditedBy: "jane.smith",
        lastEditedDate: new Date("2024-01-10"),
        published: true
    },
    {
        id: 3,
        name: "Tilt & Extend Hydraulic Cylinders",
        image: "schematics/W:L Tilt, Tow Bar Extend, & Wheel Lift Extend Hydraulic Cylinders.jpg",
        imageSize: "2560x1920",
        associatedModels: ["Century Steel Carrier", "Miller Industries"],
        partCount: 28,
        needsAttention: true,
        lastEditedBy: "mike.wilson",
        lastEditedDate: new Date("2024-01-08"),
        published: true
    },
    {
        id: 4,
        name: "Standard PTO Panel",
        image: "schematics/Standard PTO Panel.jpg",
        imageSize: "1920x1280",
        associatedModels: ["Jerr-Dan", "Miller Industries"],
        partCount: 18,
        needsAttention: false,
        lastEditedBy: "sarah.johnson",
        lastEditedDate: new Date("2024-01-05"),
        published: true
    },
    {
        id: 5,
        name: "Anti-Tilt Assembly",
        image: "schematics/Anti-Tilt Assembly.jpg",
        imageSize: "1600x1200",
        associatedModels: ["Century Steel Carrier"],
        partCount: 67,
        needsAttention: false,
        lastEditedBy: "tom.brown",
        lastEditedDate: new Date("2024-01-03"),
        published: true
    },
    {
        id: 6,
        name: "Light Bar Assembly",
        image: "schematics/Light Bar Assembly.jpg",
        imageSize: "2200x1650",
        associatedModels: ["Jerr-Dan"],
        partCount: 23,
        needsAttention: true,
        lastEditedBy: "lisa.davis",
        lastEditedDate: new Date("2024-01-01"),
        published: true
    },
    {
        id: 7,
        name: "RH Control & Crossrod Assembly",
        image: "schematics/RH Control & Crossrod Assembly.jpg",
        imageSize: "1920x1440",
        associatedModels: ["Miller Industries"],
        partCount: 15,
        needsAttention: false,
        lastEditedBy: "david.garcia",
        lastEditedDate: new Date("2023-12-28"),
        published: true
    },
    {
        id: 8,
        name: "Red and Amber Light Assembly",
        image: "schematics/Red and Amber Light Assembly.jpg",
        imageSize: "2400x1800",
        associatedModels: ["Jerr-Dan", "Century Steel Carrier", "Miller Industries"],
        partCount: 52,
        needsAttention: true,
        lastEditedBy: "amy.martinez",
        lastEditedDate: new Date("2023-12-25"),
        published: true
    },
    {
        id: 9,
        name: "Dashboard Panel",
        image: "schematics/dashboard-panel.jpg",
        imageSize: "2048x1365",
        associatedModels: ["Century Steel Carrier"],
        partCount: 34,
        needsAttention: false,
        lastEditedBy: "chris.lee",
        lastEditedDate: new Date("2023-12-20"),
        published: true
    },
    {
        id: 10,
        name: "Lift Adapter Assembly",
        image: "schematics/lift-adapter.jpg",
        imageSize: "640x480",
        associatedModels: ["Jerr-Dan", "Miller Industries"],
        partCount: 12,
        needsAttention: false,
        lastEditedBy: "robert.taylor",
        lastEditedDate: new Date("2023-12-15"),
        published: true
    },
    {
        id: 11,
        name: "Toolbox Assembly",
        image: "schematics/toolbox.jpg",
        imageSize: "1920x1280",
        associatedModels: ["Miller Industries"],
        partCount: 8,
        needsAttention: true,
        lastEditedBy: "kevin.chen",
        lastEditedDate: new Date("2023-12-10"),
        published: true
    }
];

// Global State
let currentData = [...dummyData];
let itemsToShow = 8;
const itemsPerLoad = 8;
let sortOrder = 'asc';
let sortColumn = '';

// Global state for position selection
let positionSelectionMode = false;
let currentPositionIndex = -1;

// Toast notification system
function showToast(message, type = 'info', duration = 5000) {
    const container = document.getElementById('toastContainer');
    const toastId = 'toast-' + Date.now();
    
    // Choose icon based on type
    let iconName;
    switch(type) {
        case 'success': iconName = 'check-circle'; break;
        case 'error': iconName = 'x-circle'; break;
        case 'warning': iconName = 'alert-triangle'; break;
        default: iconName = 'info'; break;
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.id = toastId;
    toast.innerHTML = `
        <div class="toast-icon">
            <i data-feather="${iconName}"></i>
        </div>
        <div class="toast-content">${message}</div>
        <button class="toast-close" onclick="hideToast('${toastId}')">
            <i data-feather="x"></i>
        </button>
    `;
    
    container.appendChild(toast);
    feather.replace();
    
    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto-hide after duration
    if (duration > 0) {
        setTimeout(() => {
            hideToast(toastId);
        }, duration);
    }
    
    return toastId;
}

function hideToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.classList.add('hide');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

function hideAllToasts() {
    const toasts = document.querySelectorAll('.toast');
    toasts.forEach(toast => {
        hideToast(toast.id);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing application');
    
    try {
        loadSortState();
        console.log('Sort state loaded');
        
        loadThumbnailSize();
        console.log('Thumbnail size loaded');
        
        renderData();
        console.log('Data rendered');
        
        console.log('Application initialization complete');
    } catch (error) {
        console.error('Error during application initialization:', error);
    }
});

// Load sort state from localStorage
function loadSortState() {
    const savedSortColumn = localStorage.getItem('schematicsAdmin_sortColumn');
    const savedSortOrder = localStorage.getItem('schematicsAdmin_sortOrder');
    
    if (savedSortColumn && savedSortOrder) {
        sortColumn = savedSortColumn;
        sortOrder = savedSortOrder;
        
        // Apply the saved sort to the data
        sortTable(sortColumn, false); // false to skip saving again
    }
}

// Save sort state to localStorage
function saveSortState() {
    localStorage.setItem('schematicsAdmin_sortColumn', sortColumn);
    localStorage.setItem('schematicsAdmin_sortOrder', sortOrder);
}

// Load thumbnail size from localStorage
function loadThumbnailSize() {
    const savedSize = localStorage.getItem('schematicsAdmin_thumbnailSize') || 'small';
    const thumbnailSelect = document.getElementById('thumbnailSize');
    
    if (thumbnailSelect) {
        thumbnailSelect.value = savedSize;
    }
    
    applyThumbnailSize(savedSize);
}

// Handle thumbnail size change
function handleThumbnailSize() {
    const thumbnailSelect = document.getElementById('thumbnailSize');
    
    if (!thumbnailSelect) {
        console.error('Thumbnail size select element not found');
        return;
    }
    
    const size = thumbnailSelect.value;
    localStorage.setItem('schematicsAdmin_thumbnailSize', size);
    applyThumbnailSize(size);
}

// Apply thumbnail size class to table
function applyThumbnailSize(size) {
    const table = document.querySelector('.schematics-table');
    
    if (!table) {
        console.error('Schematics table not found');
        return;
    }
    
    table.classList.remove('small-thumbnails', 'large-thumbnails');
    if (size !== 'default') {
        table.classList.add(size + '-thumbnails');
    }
}

// Search functionality
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm === '') {
        currentData = [...dummyData];
    } else {
        currentData = dummyData.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.associatedModels.some(model => model.toLowerCase().includes(searchTerm)) ||
            item.lastEditedBy.toLowerCase().includes(searchTerm)
        );
    }
    
    itemsToShow = itemsPerLoad;
    renderData();
}

// Model filter functionality
function handleBrandFilter() {
    const brandSelect = document.getElementById('brandFilter');
    const modelSelect = document.getElementById('modelFilter');
    const selectedBrand = brandSelect.value;

    // Reset and populate model filter
    modelSelect.innerHTML = '<option value="">Select a brand first...</option>';
    modelSelect.disabled = true;
    if (selectedBrand !== 'all') {
        // Map display brand names to keys in brandModelData
        let brandKey = '';
        if (selectedBrand === 'Jerr-Dan') brandKey = 'jerr-dan';
        else if (selectedBrand === 'Century Steel Carrier') brandKey = 'century';
        else if (selectedBrand === 'Miller Industries') brandKey = 'miller';
        if (brandModelData[brandKey]) {
            modelSelect.innerHTML = '<option value="all">All Models</option>' + brandModelData[brandKey].map(model => `<option value="${model}">${model}</option>`).join('');
            modelSelect.disabled = false;
        }
    }
    // Reset model filter to 'all' on brand change
    modelSelect.value = 'all';
    itemsToShow = itemsPerLoad;
    handleModelFilter();
}

function handleModelFilter() {
    const brandSelect = document.getElementById('brandFilter');
    const modelSelect = document.getElementById('modelFilter');
    const selectedBrand = brandSelect.value;
    const selectedModel = modelSelect.value;

    if (selectedBrand === 'all') {
        currentData = [...dummyData];
    } else {
        currentData = dummyData.filter(item => item.associatedModels.includes(selectedBrand));
        if (selectedModel && selectedModel !== 'all') {
            currentData = currentData.filter(item => item.associatedModels.includes(selectedModel));
        }
    }
    itemsToShow = itemsPerLoad;
    renderData();
}

// Table column sorting
function sortTable(column, shouldSave = true) {
    if (sortColumn === column) {
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortOrder = 'asc';
    }
    
    // Save sort state to localStorage
    if (shouldSave) {
        saveSortState();
    }
    
    // Update header classes for visual indication
    updateSortHeaders();
    
    currentData.sort((a, b) => {
        let aValue, bValue;
        
        // Map column names to data properties
        switch(column) {
            case 'name':
                aValue = a.name;
                bValue = b.name;
                break;
            case 'image':
                aValue = a.name; // Sort by name for image column
                bValue = b.name;
                break;
            case 'needsAttention':
                aValue = a.needsAttention ? 1 : 0;
                bValue = b.needsAttention ? 1 : 0;
                break;
            case 'lastEditedDate':
                aValue = new Date(a.lastEditedDate);
                bValue = new Date(b.lastEditedDate);
                break;
            default:
                aValue = a[column];
                bValue = b[column];
        }
        
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });
    
    renderData();
}

// Update sort header visual indicators
function updateSortHeaders() {
    // Remove all sort classes from headers
    document.querySelectorAll('.schematics-table th').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc', 'sort-active');
    });
    
    // Add appropriate class to current sort column
    if (sortColumn) {
        // Find the header by matching the onclick attribute
        const headers = document.querySelectorAll('.schematics-table th[onclick]');
        headers.forEach(header => {
            const onclickValue = header.getAttribute('onclick');
            if (onclickValue && onclickValue.includes(`'${sortColumn}'`)) {
                header.classList.add('sort-' + sortOrder);
                header.classList.add('sort-active');
            }
        });
    }
}

// Load more data
function loadMore() {
    itemsToShow += itemsPerLoad;
    renderData();
}

// Render data based on current view
function renderData() {
    renderTableView();
}

// Render table view
function renderTableView() {
    const tbody = document.getElementById('schematicsTableBody');
    
    if (!tbody) {
        console.error('Table body element not found. Make sure the element with ID "schematicsTableBody" exists.');
        return;
    }
    
    const pageData = currentData.slice(0, itemsToShow);
    tbody.innerHTML = '';
    
    pageData.forEach(item => {
        const row = document.createElement('tr');
        
        // Parse image dimensions to check if width is less than 800px
        const dimensions = item.imageSize.split('x');
        const width = parseInt(dimensions[0]);
        const isLowRes = width < 800;
        const imageSizeClass = isLowRes ? 'image-size-warning' : 'image-size-normal';
        
        row.innerHTML = `
            <td>
                ${item.needsAttention ? '<span class="status-icon"><i data-feather="alert-triangle"></i><div class="tooltip">Needs Review</div></span>' : ''}
            </td>
            <td class="${imageSizeClass}">
                <img src="${item.image}" alt="${item.name}" class="clickable-image" onclick="openImageView('${item.image}', '${item.name}')" />
                ${isLowRes ? `<small>Low Res.</small>` : ''}
            </td>
            <td>
                <strong>${item.name}</strong><br>
                <small class="text-secondary">${item.associatedModels.join(', ')}</small>
            </td>
            
            <td>
                <div>${formatDate(item.lastEditedDate)}</div>
                <small class="text-secondary">by ${item.lastEditedBy}</small>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-tertiary" onclick="editSchematic(${item.id})">
                        <i data-feather="edit"></i>
                        Edit
                    </button>
                    <button class="btn btn-tertiary" onclick="deleteSchematic(${item.id})">
                        <i data-feather="trash-2"></i>
                        Delete
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Re-initialize Feather icons
    feather.replace();
    
    // Update sort header indicators
    updateSortHeaders();
    
    // Show/hide Load More button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (itemsToShow >= currentData.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = '';
        }
    }
}

// Global state for modal
let currentSchematicId = null;
let isEditMode = false;
let selectedDepartments = [];
let hotspots = []; // Array of {id, partIndex, number, x, y, confidence}
let partsData = [];
let selectedHotspot = null;
let hotspotIdCounter = 0;
let hotspotScale = 1.0; // Scale factor for hotspot size (0.5 to 2.0)

// Brand and model data
const brandModelData = {
    'jerr-dan': ['Carrier 16', 'Carrier 20', 'MPL-NG', 'Quick Swing'],
    'century': ['10 Series', '12 Series', 'Steel Carrier', 'Heavy Duty'],
    'miller': ['Model 9000', 'Model 8000', 'Century 440', 'Vulcan']
};

// Department suggestions
const departmentSuggestions = [
    'wreckers', 'car carriers', 'snow removal', 'toolboxes', 'tow dollies',
    'hydraulics', 'electrical', 'lighting', 'controls', 'winches'
];

// Equipment categories for models
const equipmentCategories = [
    'Car Carriers',
    'Wreckers',
    'Snow Removal',
    'Winches',
    'Side Puller Recovery Systems',
    'Tow Dollies',
    'Detachable Underlifts',
    'Auto Positioning Dollies',
    'Lights',
    'Trailers',
    'Toolboxes',
    'Fifth Wheel Power Hitch'
];

// Helper to render category dropdown
function renderCategoryDropdown(id, selected) {
    return `<div class="input-group">
        <label class="floating-label">Category</label>
        <select id="${id}" class="model-category-select">
            ${equipmentCategories.map(cat => `<option value="${cat}"${cat === selected ? ' selected' : ''}>${cat}</option>`).join('')}
        </select>
    </div>`;
}

// Modal functionality
function openSchematicModal(id = null) {
    currentSchematicId = id;
    isEditMode = id !== null;
    
    const modal = document.getElementById('schematicModal');
    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');
    const settingsGroup = document.getElementById('settingsGroup');
    const deleteBtn = document.getElementById('deleteSchematicBtn');
    
    // Reset form and state
    document.getElementById('schematicForm').reset();
    selectedDepartments = [];
    hotspots = [];
    partsData = [];
    selectedHotspot = null;
    hotspotScale = 1.0; // Reset to standard size
    
    // Reset hotspot size selector
    const hotspotSizeSelect = document.getElementById('hotspotSize');
    if (hotspotSizeSelect) {
        hotspotSizeSelect.value = '1.0';
    }
    
    // Update modal for add/edit mode
    if (isEditMode) {
        modalTitle.textContent = 'Edit Schematic';
        submitBtn.textContent = 'Update Schematic';
        settingsGroup.style.display = 'block';
        if (deleteBtn) deleteBtn.style.display = '';
        populateEditForm(id);
    } else {
        modalTitle.textContent = 'Add New Schematic';
        submitBtn.textContent = 'Add Schematic';
        settingsGroup.style.display = 'block';
        if (deleteBtn) deleteBtn.style.display = 'none';
        // Set toggles to default
        document.getElementById('schematicPublished').checked = true;
        document.getElementById('schematicReviewed').checked = false;
    }
    
    // Show modal and expand first section
    modal.classList.add('active');
    expandSection('identity');
    
    // Setup drag and drop functionality
    setupDragAndDrop();
    
    // Update department tags display
    updateDepartmentTags();
}

function closeSchematicModal() {
    const modal = document.getElementById('schematicModal');
    modal.classList.remove('active');
    
    // Reset all form fields and state
    document.getElementById('schematicForm').reset();
    selectedDepartments = [];
    hotspots = [];
    partsData = [];
    selectedHotspot = null;
    currentSchematicId = null;
    isEditMode = false;
    
    // Hide preview containers
    document.getElementById('imagePreviewContainer').style.display = 'none';
    document.getElementById('partsTableContainer').style.display = 'none';
}

function populateEditForm(id) {
    const schematic = dummyData.find(item => item.id === id);
    if (!schematic) return;
    
    // Populate basic fields
    document.getElementById('schematicName').value = schematic.name;
    
    // Mock department data (since we don't have it in current data structure)
    selectedDepartments = ['wreckers', 'car carriers'];
    updateDepartmentTags();
    
    // Mock brand/model selection
    document.getElementById('schematicBrand').value = 'jerr-dan';
    handleBrandChange();
    document.getElementById('schematicModel').value = brandModelData['jerr-dan'][0];
    
    // Published toggle
    document.getElementById('schematicPublished').checked = schematic.published !== false;
    document.getElementById('schematicReviewed').checked = schematic.reviewed === true;
    
    // If there's an existing image, show preview
    if (schematic.image) {
        showImagePreview(schematic.image);
        
        // Mock parts data with multiple hotspots
        partsData = [
            { schematicNumber: '1', partSku: 'ABC-123', quantity: '2', parentSku: '', confidence: 0.95 },
            { schematicNumber: '2', partSku: 'DEF-456', quantity: '1', parentSku: 'ABC-123', confidence: 0.88 },
            { schematicNumber: '3', partSku: 'GHI-789', quantity: '4', parentSku: '', confidence: 0.92 }
        ];
        
        // Mock hotspots - including multiple hotspots for part "3"
        hotspots = [
            { id: ++hotspotIdCounter, partIndex: 0, number: '1', x: 20, y: 30, confidence: 0.95 },
            { id: ++hotspotIdCounter, partIndex: 1, number: '2', x: 60, y: 25, confidence: 0.88 },
            { id: ++hotspotIdCounter, partIndex: 2, number: '3', x: 40, y: 70, confidence: 0.92 },
            { id: ++hotspotIdCounter, partIndex: 2, number: '3', x: 25, y: 85, confidence: 0.92 },
            { id: ++hotspotIdCounter, partIndex: 2, number: '3', x: 75, y: 45, confidence: 0.92 },
            { id: ++hotspotIdCounter, partIndex: 2, number: '3', x: 55, y: 60, confidence: 0.92 }
        ];
        
        displayHotspots();
        updatePartsTable();
        document.getElementById('partsTableContainer').style.display = 'block';
    }
}

// Section toggle functionality
function toggleSection(sectionName) {
    const section = document.getElementById(sectionName + 'Section');
    const header = section.parentElement.querySelector('.section-header');
    
    if (section.classList.contains('active')) {
        section.classList.remove('active');
        header.classList.add('collapsed');
    } else {
        // Close all other sections
        document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.section-header').forEach(h => h.classList.add('collapsed'));
        
        // Open this section
        section.classList.add('active');
        header.classList.remove('collapsed');
    }
}

function expandSection(sectionName) {
    const section = document.getElementById(sectionName + 'Section');
    const header = section.parentElement.querySelector('.section-header');
    
    // Close all sections first
    document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.section-header').forEach(h => h.classList.add('collapsed'));
    
    // Open the specified section
    section.classList.add('active');
    header.classList.remove('collapsed');
}

// Department tagging functionality
function handleDepartmentInput(event) {
    const input = event.target;
    const value = input.value.toLowerCase().trim();
    
    if (event.key === 'Enter' && value) {
        event.preventDefault();
        addDepartment(value);
        input.value = '';
        hideDepartmentSuggestions();
        return;
    }
    
    if (event.key === 'Escape') {
        hideDepartmentSuggestions();
        return;
    }
    
    if (value.length > 0) {
        showDepartmentSuggestions(value);
    } else {
        hideDepartmentSuggestions();
    }
}

function addDepartment(department) {
    const normalizedDept = department.toLowerCase().trim();
    if (normalizedDept && !selectedDepartments.includes(normalizedDept)) {
        selectedDepartments.push(normalizedDept);
        updateDepartmentTags();
    }
}

function removeDepartment(department) {
    selectedDepartments = selectedDepartments.filter(d => d !== department);
    updateDepartmentTags();
}

function updateDepartmentTags() {
    const container = document.getElementById('departmentTags');
    
    // If the element doesn't exist, just return (department functionality may not be present)
    if (!container) {
        return;
    }
    
    container.innerHTML = '';
    
    selectedDepartments.forEach(dept => {
        const tag = document.createElement('div');
        tag.className = 'department-tag';
        tag.innerHTML = `
            ${dept}
            <span class="remove-tag" onclick="removeDepartment('${dept}')">
                <i data-feather="x"></i>
            </span>
        `;
        container.appendChild(tag);
    });
    
    // Re-initialize feather icons
    feather.replace();
}

function showDepartmentSuggestions(filter) {
    const suggestions = departmentSuggestions.filter(dept => 
        dept.toLowerCase().includes(filter) && !selectedDepartments.includes(dept.toLowerCase())
    );
    
    const container = document.getElementById('departmentSuggestions');
    
    // If the element doesn't exist, just return
    if (!container) {
        return;
    }
    
    container.innerHTML = '';
    
    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.className = 'department-suggestion';
            div.textContent = suggestion;
            div.onclick = () => {
                addDepartment(suggestion);
                const departmentInput = document.getElementById('schematicDepartment');
                if (departmentInput) {
                    departmentInput.value = '';
                }
                hideDepartmentSuggestions();
            };
            container.appendChild(div);
        });
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

function hideDepartmentSuggestions() {
    const container = document.getElementById('departmentSuggestions');
    if (container) {
        container.style.display = 'none';
    }
}

// Close modal when clicking outside or handle other clicks
document.addEventListener('click', function(event) {
    const schematicModal = document.getElementById('schematicModal');
    const imageViewModal = document.getElementById('imageViewModal');
    const brandModelModal = document.getElementById('brandModelModal');
    const suggestionsContainer = document.getElementById('departmentSuggestions');
    const departmentInput = document.getElementById('schematicDepartment');
    
    // Handle hotspot deselection (only if schematic modal is active)
    if (schematicModal && schematicModal.classList.contains('active')) {
        if (!event.target.closest('.number-overlay') && !event.target.closest('.hotspot-controls')) {
            selectedHotspot = null;
            document.querySelectorAll('.number-overlay').forEach(el => el.classList.remove('selected'));
            document.querySelectorAll('.hotspot-controls').forEach(el => el.remove());
        }
    }
    
    // Close brand model modal when clicking outside
    if (event.target === brandModelModal) {
        closeBrandModelModal();
        return;
    }
    
    // Close schematic modal when clicking outside
    if (event.target === schematicModal) {
        closeSchematicModal();
        return;
    }
    
    // Close image view modal when clicking outside
    if (event.target === imageViewModal) {
        closeImageViewModal();
        return;
    }
    
    // Close suggestions when clicking outside (only if elements exist)
    if (suggestionsContainer && departmentInput && 
        !suggestionsContainer.contains(event.target) && event.target !== departmentInput) {
        hideDepartmentSuggestions();
    }
});

// Handle escape key to close modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const schematicModal = document.getElementById('schematicModal');
        const imageViewModal = document.getElementById('imageViewModal');
        const brandModelModal = document.getElementById('brandModelModal');
        
        if (brandModelModal && brandModelModal.classList.contains('active')) {
            closeBrandModelModal();
        } else if (schematicModal && schematicModal.classList.contains('active')) {
            closeSchematicModal();
        } else if (imageViewModal && imageViewModal.classList.contains('active')) {
            closeImageViewModal();
        }
    }
});

// Brand and model handling
function handleBrandChange() {
    const brandSelect = document.getElementById('schematicBrand');
    const modelSelect = document.getElementById('schematicModel');
    const selectedBrand = brandSelect.value;
    
    modelSelect.innerHTML = '<option value="">Select a model...</option>';
    
    if (selectedBrand && brandModelData[selectedBrand]) {
        modelSelect.disabled = false;
        brandModelData[selectedBrand].forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    } else {
        modelSelect.disabled = true;
    }
}

// Image upload and processing
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    processImageFile(file);
}

function processImageFile(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Check minimum dimensions
            if (img.width < 800 || img.height < 600) {
                alert('Image must be at least 800x600 pixels.');
                return;
            }
            
            showImagePreview(e.target.result);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Add drag and drop functionality
function setupDragAndDrop() {
    const uploadContainer = document.querySelector('.file-upload-container');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadContainer.addEventListener(eventName, preventDefaults, false);
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadContainer.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadContainer.addEventListener('drop', handleDrop, false);
    });
    
    // Make the container clickable
    uploadContainer.addEventListener('click', () => {
        document.getElementById('schematicImageFile').click();
    });
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    e.currentTarget.classList.add('drag-over');
}

function unhighlight(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        processImageFile(files[0]);
    }
}

function handleHotspotDrop(e) {
    e.preventDefault();
    
    if (!draggedHotspotId) return;
    
    const rect = e.target.getBoundingClientRect();
    // Center the hotspot on the drop location
    const hotspotSize = 30 * hotspotScale; // Scaled size of hotspot in pixels
    const offsetX = hotspotSize / 2;
    const offsetY = hotspotSize / 2;
    
    let x = ((e.clientX - rect.left - offsetX) / rect.width) * 100;
    let y = ((e.clientY - rect.top - offsetY) / rect.height) * 100;
    
    // Keep within bounds
    x = Math.max(0, Math.min(95, x));
    y = Math.max(0, Math.min(95, y));
    
    // Update hotspot position
    const hotspot = hotspots.find(h => h.id === draggedHotspotId);
    if (hotspot) {
        hotspot.x = Math.round(x);
        hotspot.y = Math.round(y);
        
        // Remove confidence score since user manually moved the hotspot
        if (partsData[hotspot.partIndex]) {
            partsData[hotspot.partIndex].confidence = null;
        }
        
        displayHotspots();
        selectHotspot(draggedHotspotId);
        updatePartsTable(); // Refresh to show updated confidence
        showToast('Hotspot position updated!', 'success', 2000);
    }
}

function showImagePreview(imageSrc) {
    const container = document.getElementById('imagePreviewContainer');
    const previewImg = document.getElementById('previewImage');
    
    previewImg.src = imageSrc;
    container.style.display = 'block';
    
    // Clear any existing overlays
    document.getElementById('numberOverlays').innerHTML = '';
    hotspots = [];
    partsData = [];
    selectedHotspot = null;
    
    // Expand the diagram section
    expandSection('diagram');
    
    console.log('Image preview loaded, ready for hotspots');
}

// Mock AI number scanning
function scanForNumbers() {
    // Warn user about clearing existing parts
    if (partsData.length > 0) {
        if (!confirm('Re-scanning will clear all existing parts data. Are you sure you want to continue?')) {
            return;
        }
    }
    
    // Initialize parts data
    partsData = [
        { schematicNumber: '1', partSku: '', quantity: '', parentSku: '', confidence: 0.95 },
        { schematicNumber: '2', partSku: '', quantity: '', parentSku: '', confidence: 0.88 },
        { schematicNumber: '3', partSku: '', quantity: '', parentSku: '', confidence: 0.92 },
        { schematicNumber: '4', partSku: '', quantity: '', parentSku: '', confidence: 0.76 },
        { schematicNumber: '5', partSku: '', quantity: '', parentSku: '', confidence: 0.83 }
    ];
    
    // Initialize hotspots (one per part initially)
    hotspots = partsData.map((part, index) => ({
        id: ++hotspotIdCounter,
        partIndex: index,
        number: part.schematicNumber,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        confidence: part.confidence
    }));
    
    displayHotspots();
    updatePartsTable();
    document.getElementById('partsTableContainer').style.display = 'block';
}

function displayHotspots() {
    const container = document.getElementById('numberOverlays');
    container.innerHTML = '';
    
    hotspots.forEach(hotspot => {
        const overlay = document.createElement('div');
        overlay.className = 'number-overlay draggable';
        overlay.style.left = hotspot.x + '%';
        overlay.style.top = hotspot.y + '%';
        // Apply scaling to hotspot size and font
        const size = 30 * hotspotScale;
        const fontSize = 14 * hotspotScale;
        overlay.style.width = size + 'px';
        overlay.style.height = size + 'px';
        overlay.style.fontSize = fontSize + 'px';
        overlay.textContent = hotspot.number;
        overlay.dataset.hotspotId = hotspot.id;
        
        // Add click handler for selection
        overlay.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Hotspot clicked:', hotspot.id);
            selectHotspot(hotspot.id);
        });
        
        // Make draggable
        overlay.draggable = true;
        overlay.addEventListener('dragstart', handleHotspotDragStart);
        overlay.addEventListener('dragend', handleHotspotDragEnd);
        
        container.appendChild(overlay);
    });
    
    // Add drop handling to the image
    const imagePreview = document.getElementById('previewImage');
    // Remove existing event listeners to prevent duplicates
    imagePreview.removeEventListener('dragover', handleDragOver);
    imagePreview.removeEventListener('drop', handleHotspotDrop);
    // Add fresh event listeners
    imagePreview.addEventListener('dragover', handleDragOver);
    imagePreview.addEventListener('drop', handleHotspotDrop);
}

function selectHotspot(hotspotId) {
    console.log('Selecting hotspot:', hotspotId);
    // Clear previous selection
    document.querySelectorAll('.number-overlay').forEach(el => el.classList.remove('selected'));
    
    selectedHotspot = hotspotId;
    const overlay = document.querySelector(`[data-hotspot-id="${hotspotId}"]`);
    if (!overlay) {
        console.error('Could not find overlay for hotspot:', hotspotId);
        return;
    }
    overlay.classList.add('selected');
    
    // Show hotspot controls
    showHotspotControls(hotspotId);
}

function showHotspotControls(hotspotId) {
    // Remove existing controls
    document.querySelectorAll('.hotspot-controls').forEach(el => el.remove());
    
    const hotspot = hotspots.find(h => h.id === hotspotId);
    if (!hotspot) return;
    
    const overlay = document.querySelector(`[data-hotspot-id="${hotspotId}"]`);
    const controls = document.createElement('div');
    controls.className = 'hotspot-controls';
    
    // Count how many hotspots exist for this part
    const partHotspots = hotspots.filter(h => h.partIndex === hotspot.partIndex);
    const canRemove = partHotspots.length > 1;
    
    // Create duplicate button
    const duplicateBtn = document.createElement('button');
    duplicateBtn.className = 'hotspot-btn duplicate-btn';
    duplicateBtn.title = 'Duplicate';
    duplicateBtn.innerHTML = '<i data-feather="copy"></i>';
    duplicateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Duplicate button clicked');
        duplicateHotspot(hotspotId);
    });
    controls.appendChild(duplicateBtn);
    
    // Create remove button if allowed
    if (canRemove) {
        const removeBtn = document.createElement('button');
        removeBtn.className = 'hotspot-btn remove-btn';
        removeBtn.title = 'Remove';
        removeBtn.innerHTML = '<i data-feather="trash-2"></i>';
        removeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Remove button clicked');
            removeHotspot(hotspotId);
        });
        controls.appendChild(removeBtn);
    }
    
    // Position controls near the hotspot
    const rect = overlay.getBoundingClientRect();
    const containerRect = overlay.parentElement.getBoundingClientRect();
    const scaledSize = 30 * hotspotScale;
    controls.style.position = 'absolute';
    controls.style.left = (rect.left - containerRect.left + scaledSize + 5) + 'px';
    controls.style.top = (rect.top - containerRect.top - 10) + 'px';
    
    overlay.parentElement.appendChild(controls);
    feather.replace();
}

function duplicateHotspot(hotspotId) {
    console.log('Duplicating hotspot:', hotspotId);
    const hotspot = hotspots.find(h => h.id === hotspotId);
    if (!hotspot) {
        console.error('Hotspot not found:', hotspotId);
        return;
    }
    
    const newHotspot = {
        id: ++hotspotIdCounter,
        partIndex: hotspot.partIndex,
        number: hotspot.number,
        x: hotspot.x + 5, // Offset slightly
        y: hotspot.y + 5,
        confidence: hotspot.confidence
    };
    
    hotspots.push(newHotspot);
    
    // Remove confidence score from the associated part since user manually duplicated
    if (partsData[hotspot.partIndex]) {
        partsData[hotspot.partIndex].confidence = null;
    }
    
    console.log('New hotspot created:', newHotspot);
    displayHotspots();
    selectHotspot(newHotspot.id);
    updatePartsTable(); // Refresh to show updated confidence
    showToast('Hotspot duplicated successfully!', 'success', 2000);
}

function removeHotspot(hotspotId) {
    console.log('Removing hotspot:', hotspotId);
    const hotspot = hotspots.find(h => h.id === hotspotId);
    if (!hotspot) {
        console.error('Hotspot not found:', hotspotId);
        return;
    }
    
    // Check if this is the last hotspot for the part
    const partHotspots = hotspots.filter(h => h.partIndex === hotspot.partIndex);
    if (partHotspots.length <= 1) {
        showToast('Cannot remove the last hotspot for a part. Each part must have at least one hotspot.', 'warning');
        return;
    }
    
    hotspots = hotspots.filter(h => h.id !== hotspotId);
    displayHotspots();
    
    // Clear selection
    selectedHotspot = null;
    document.querySelectorAll('.hotspot-controls').forEach(el => el.remove());
    showToast('Hotspot removed successfully!', 'success', 2000);
}

let draggedHotspotId = null;

function handleHotspotDragStart(e) {
    draggedHotspotId = parseInt(e.target.dataset.hotspotId);
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleHotspotDragEnd(e) {
    draggedHotspotId = null;
}

// Parts table management
function updatePartsTable() {
    const tbody = document.getElementById('partsTableBody');
    tbody.innerHTML = '';
    
    partsData.forEach((part, index) => {
        const row = document.createElement('tr');
        
        const confidenceClass = part.confidence > 0.9 ? 'confidence-high' : 
                              part.confidence > 0.7 ? 'confidence-medium' : 'confidence-low';
        const confidenceDisplay = part.confidence === null ? 
                                'Manual' : 
                                `${Math.round(part.confidence * 100)}%`;
        
        // Check if row has missing required data or no hotspots
        const partHotspots = hotspots.filter(h => h.partIndex === index);
        const isMissingData = !part.partSku || !part.quantity || partHotspots.length === 0;
        
        if (isMissingData) {
            row.classList.add('part-row-warning');
        }
        
        row.innerHTML = `
            <td><input type="text" value="${part.schematicNumber}" onchange="updatePartNumber(${index}, this.value)" class="input-small"></td>
            <td><input type="text" value="${part.partSku}" onchange="updatePartData(${index}, 'partSku', this.value)" placeholder="-" class="input-small"></td>
            <td><input type="number" value="${part.quantity}" onchange="updatePartData(${index}, 'quantity', this.value)" placeholder="0" min="1" class="input-qty"></td>
            <td><input type="text" value="${part.parentSku}" onchange="updatePartData(${index}, 'parentSku', this.value)" placeholder="-" class="input-small"></td>
            <td><span class="confidence-score ${confidenceClass}">${confidenceDisplay}</span></td>
            <td><button type="button" class="btn btn-tertiary" onclick="removePartRow(${index})"><i data-feather="trash-2"></i></button></td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Re-initialize feather icons
    feather.replace();
}

function updatePartNumber(index, newNumber) {
    if (partsData[index]) {
        const oldNumber = partsData[index].schematicNumber;
        partsData[index].schematicNumber = newNumber;
        
        // Update all hotspots for this part
        hotspots.forEach(hotspot => {
            if (hotspot.partIndex === index) {
                hotspot.number = newNumber;
            }
        });
        
        // Refresh displays
        displayHotspots();
        updatePartsTable();
        showToast(`Part number updated from "${oldNumber}" to "${newNumber}"`, 'success', 3000);
    }
}

function updatePartData(index, field, value) {
    if (partsData[index]) {
        partsData[index][field] = value;
        // Remove confidence score when user manually edits data
        if (value.trim() !== '') {
            partsData[index].confidence = null;
        }
        // Refresh the table to update warning highlights
        updatePartsTable();
    }
}

function addPartRow() {
    const newNumber = String(partsData.length + 1);
    const newPart = {
        schematicNumber: newNumber,
        partSku: '',
        quantity: '',
        parentSku: '',
        confidence: null // Manual entries don't have AI confidence scores
    };
    
    partsData.push(newPart);
    
    // Add a default hotspot for the new part
    const newHotspot = {
        id: ++hotspotIdCounter,
        partIndex: partsData.length - 1,
        number: newNumber,
        x: 50, // Center position
        y: 50,
        confidence: null
    };
    
    hotspots.push(newHotspot);
    displayHotspots();
    updatePartsTable();
}

function removePartRow(index) {
    // Remove all hotspots for this part
    hotspots = hotspots.filter(h => h.partIndex !== index);
    
    // Update hotspot part indices for parts that come after this one
    hotspots.forEach(hotspot => {
        if (hotspot.partIndex > index) {
            hotspot.partIndex--;
        }
    });
    
    // Remove the part
    partsData.splice(index, 1);
    
    displayHotspots();
    updatePartsTable();
}

// Parts list upload (mock OCR)
function uploadPartsList() {
    document.getElementById('partsListFile').click();
}

function handlePartsListUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Mock OCR processing
    showToast('Processing parts list with OCR... Please wait.', 'info', 3000);
    
    setTimeout(() => {
        // Simulate extracted data from OCR
        const ocrData = [
            { schematicNumber: '1', partSku: 'OCR-ABC-123', quantity: '2', parentSku: '', confidence: 0.85 },
            { schematicNumber: '2', partSku: 'OCR-DEF-456', quantity: '1', parentSku: 'OCR-ABC-123', confidence: 0.91 },
            { schematicNumber: '3', partSku: 'OCR-GHI-789', quantity: '3', parentSku: '', confidence: 0.78 }
        ];
        
        const ocrHotspots = [
            { id: ++hotspotIdCounter, partIndex: 0, number: '1', x: 15, y: 45, confidence: 0.85 },
            { id: ++hotspotIdCounter, partIndex: 1, number: '2', x: 55, y: 20, confidence: 0.91 },
            { id: ++hotspotIdCounter, partIndex: 2, number: '3', x: 75, y: 80, confidence: 0.78 }
        ];
        
        // Merge with existing data or replace
        if (confirm('OCR processing complete. Replace existing parts data with extracted data?')) {
            partsData = ocrData;
            hotspots = ocrHotspots;
            displayHotspots();
            updatePartsTable();
            showToast('Parts list processed successfully!', 'success');
        }
    }, 2000);
}

// Settings functionality
function rescanImage() {
    if (confirm('Re-scanning will clear all existing parts data. Are you sure?')) {
        scanForNumbers();
        showToast('Image re-scanned successfully!', 'success');
    }
}

function deleteSchematicFromModal() {
    if (currentSchematicId && confirm('Are you sure you want to delete this schematic? This action cannot be undone.')) {
        deleteSchematic(currentSchematicId);
        closeSchematicModal();
    }
}

// Form submission
function handleSchematicSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('schematicName').value.trim();
    const brand = document.getElementById('schematicBrand').value;
    const model = document.getElementById('schematicModel').value;
    const previewImg = document.getElementById('previewImage');
    const published = document.getElementById('schematicPublished').checked;
    const reviewed = document.getElementById('schematicReviewed').checked;
    
    // Validation
    const errors = [];
    
    if (!name) {
        errors.push('Schematic name is required.');
    }
    
    if (selectedDepartments.length === 0) {
        errors.push('At least one department must be selected.');
    }
    
    if (!brand) {
        errors.push('Brand must be selected.');
    }
    
    if (!model) {
        errors.push('Model must be selected.');
    }
    
    if (!previewImg.src || previewImg.src === '') {
        errors.push('Schematic image must be uploaded.');
    }
    
    if (partsData.length === 0) {
        errors.push('At least one part must be added to the parts table.');
    }
    
    if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
        return;
    }
    
    const schematicData = {
        name: name,
        image: previewImg.src,
        imageSize: '2048x1536', // Mock size
        associatedModels: [`${brand} ${model}`],
        partCount: partsData.length,
        needsAttention: partsData.some(part => !part.partSku || part.confidence < 0.8),
        lastEditedBy: 'current.user',
        lastEditedDate: new Date(),
        departments: selectedDepartments,
        parts: partsData,
        published: published,
        reviewed: reviewed
    };
    
    if (isEditMode) {
        updateSchematic(currentSchematicId, schematicData);
    } else {
        addNewSchematic(schematicData);
    }
    
    closeSchematicModal();
    renderData();
}

function addNewSchematic(data) {
    const newSchematic = {
        id: Math.max(...dummyData.map(item => item.id)) + 1,
        ...data
    };
    
    dummyData.unshift(newSchematic);
    currentData = [...dummyData];
    showToast('Schematic added successfully!', 'success');
}

function updateSchematic(id, data) {
    const index = dummyData.findIndex(item => item.id === id);
    if (index > -1) {
        dummyData[index] = { ...dummyData[index], ...data };
        currentData = [...dummyData];
        showToast('Schematic updated successfully!', 'success');
    }
}

// Edit schematic
function editSchematic(id) {
    openSchematicModal(id);
}

// Delete schematic
function deleteSchematic(id) {
    if (confirm('Are you sure you want to delete this schematic?')) {
        const index = dummyData.findIndex(item => item.id === id);
        if (index > -1) {
            dummyData.splice(index, 1);
            currentData = [...dummyData];
            
            // Adjust current page if necessary
            const totalPages = Math.ceil(currentData.length / itemsPerLoad);
            if (itemsToShow > totalPages && totalPages > 0) {
                itemsToShow = totalPages;
            }
            
            renderData();
            showToast('Schematic deleted successfully!', 'success');
        }
    }
}

// Utility function to format dates
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Image viewing modal functions
function openImageView(imageSrc, imageName) {
    const modal = document.getElementById('imageViewModal');
    const img = document.getElementById('imageViewImg');
    const title = document.getElementById('imageViewTitle');
    
    img.src = imageSrc;
    title.textContent = imageName;
    modal.classList.add('active');
}

function closeImageViewModal() {
    const modal = document.getElementById('imageViewModal');
    modal.classList.remove('active');
}

// Brand & Model Management System
let brandModelManager = {
    brands: {
        'jerr-dan': {
            name: 'Jerr-Dan',
            models: [
                { name: 'Carrier 16', slug: 'carrier-16', category: 'Car Carriers' },
                { name: 'Carrier 20', slug: 'carrier-20', category: 'Car Carriers' },
                { name: 'MPL-NG', slug: 'mpl-ng', category: 'Wreckers' },
                { name: 'Quick Swing', slug: 'quick-swing', category: 'Tow Dollies' },
                { name: 'Rotator Series', slug: 'rotator-series', category: 'Other' }
            ]
        },
        'century': {
            name: 'Century',
            models: [
                { name: '10 Series', slug: '10-series', category: 'Chassis' },
                { name: '12 Series', slug: '12-series', category: 'Chassis' },
                { name: 'Steel Carrier', slug: 'steel-carrier', category: 'Wreckers' },
                { name: 'Heavy Duty', slug: 'heavy-duty', category: 'Wreckers' },
                { name: 'Vulcan 810', slug: 'vulcan-810', category: 'Tow Dollies' }
            ]
        },
        'miller': {
            name: 'Miller Industries',
            models: [
                { name: 'Model 9000', slug: 'model-9000', category: 'Car Carriers' },
                { name: 'Model 8000', slug: 'model-8000', category: 'Car Carriers' },
                { name: 'Century 440', slug: 'century-440', category: 'Wreckers' },
                { name: 'Vulcan', slug: 'vulcan', category: 'Tow Dollies' },
                { name: 'Challenger 3212', slug: 'challenger-3212', category: 'Other' }
            ]
        }
    },
    
    // Get all brands
    getAllBrands() {
        return Object.keys(this.brands).map(key => ({
            id: key,
            name: this.brands[key].name,
            models: this.brands[key].models
        }));
    },
    
    // Add new brand
    addBrand(id, name) {
        if (!this.brands[id]) {
            this.brands[id] = {
                name: name,
                models: []
            };
            return true;
        }
        return false;
    },
    
    // Update brand name
    updateBrand(id, newName) {
        if (this.brands[id]) {
            this.brands[id].name = newName;
            return true;
        }
        return false;
    },
    
    // Delete brand
    deleteBrand(id) {
        if (this.brands[id]) {
            delete this.brands[id];
            return true;
        }
        return false;
    },
    
    // Add model to brand
    addModel(brandId, modelName) {
        if (this.brands[brandId] && !this.brands[brandId].models.includes(modelName)) {
            this.brands[brandId].models.push(modelName);
            return true;
        }
        return false;
    },
    
    // Update model name
    updateModel(brandId, oldName, newName) {
        if (this.brands[brandId]) {
            const index = this.brands[brandId].models.indexOf(oldName);
            if (index > -1) {
                this.brands[brandId].models[index] = newName;
                return true;
            }
        }
        return false;
    },
    
    // Delete model
    deleteModel(brandId, modelName) {
        if (this.brands[brandId]) {
            const index = this.brands[brandId].models.indexOf(modelName);
            if (index > -1) {
                this.brands[brandId].models.splice(index, 1);
                return true;
            }
        }
        return false;
    }
};

// Brand & Model Manager Modal Functions
function openBrandModelManager() {
    const modal = document.getElementById('brandModelModal');
    modal.classList.add('active');
    renderBrandsList();
}

function closeBrandModelModal() {
    const modal = document.getElementById('brandModelModal');
    modal.classList.remove('active');
    
    // Update the brand/model data in the main form
    updateBrandModelData();
}

function updateBrandModelData() {
    // Update the global brandModelData object used in the main form
    Object.keys(brandModelManager.brands).forEach(brandId => {
        brandModelData[brandId] = brandModelManager.brands[brandId].models;
    });
}

// Track which brand or model is being edited
let editingBrandId = null;
let editingModelSlug = null;
let expandedBrands = new Set();

function renderBrandsList() {
    const container = document.getElementById('brandsList');
    const brands = brandModelManager.getAllBrands();
    
    if (brands.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-feather="package"></i>
                <p>No brands configured yet.</p>
                <p>Click \"Add Brand\" to get started.</p>
            </div>
        `;
        feather.replace();
        return;
    }
    
    container.innerHTML = brands.map(brand => {
        const isBrandEditing = editingBrandId === brand.id && !editingModelSlug;
        const isExpanded = expandedBrands.has(brand.id) || isBrandEditing || (editingBrandId === brand.id && editingModelSlug);
        return `
        <div class="brand-item${isExpanded ? ' expanded' : ''}" id="brand-${brand.id}">
            <div class="brand-header" ${isBrandEditing ? '' : `onclick="toggleBrand('${brand.id}')"`}>
                <div class="brand-info">
                    <h3 class="brand-name" id="brand-name-${brand.id}">${brand.name}</h3>
                    <div class="brand-name-edit" id="brand-name-edit-${brand.id}" style="display: none;">
                        <div class="inline-form">
                            <div class="input-group">
                                <label class="floating-label">Name</label>
                                <input type="text" value="${brand.name}" id="brand-name-input-${brand.id}">
                            </div>
                            <div class="input-group">
                                <label class="floating-label">Slug</label>
                                <input type="text" value="${brand.id}" id="brand-slug-input-${brand.id}">
                            </div>
                            <div class="form-actions-inline">
                                <button class="btn-icon" onclick="event.stopPropagation(); saveBrandName('${brand.id}')" title="Save">
                                    <i data-feather="check"></i>
                                </button>
                                <button class="btn-icon" onclick="event.stopPropagation(); cancelBrandEdit('${brand.id}')" title="Cancel">
                                    <i data-feather="x"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    ${!isBrandEditing ? `<span class="brand-model-count">${brand.models.length} models</span>` : ''}
                </div>
                <div class="brand-actions">
                    ${!isBrandEditing ? `<button class="btn-icon" onclick="event.stopPropagation(); editBrand('${brand.id}')" title="Edit brand">
                        <i data-feather="edit-2"></i>
                    </button>` : ''}
                    <button class="btn-icon danger" onclick="event.stopPropagation(); deleteBrandConfirm('${brand.id}')" title="Delete brand">
                        <i data-feather="trash-2"></i>
                    </button>
                    <i data-feather="chevron-down" class="brand-toggle"></i>
                </div>
            </div>
            <div class="models-container">
                <div class="models-header">
                    <h4>Models</h4>
                    <button class="btn btn-tertiary" onclick="addNewModel('${brand.id}')">
                        <i data-feather="plus"></i>
                        Add Model
                    </button>
                </div>
                <div class="models-list">
                    ${brand.models.length > 0 ? 
                        brand.models.map(model => {
                            const isModelEditing = editingBrandId === brand.id && editingModelSlug === model.slug;
                            return `
                            <div class="model-item" id="model-${brand.id}-${model.slug}">
                                <span class="model-name" id="model-name-${brand.id}-${model.slug}">${model.name}</span>
                                <div class="model-name-edit" id="model-name-edit-${brand.id}-${model.slug}" style="display: none;">
                                    <div class="inline-form">
                                        <div class="input-group">
                                            <label class="floating-label">Name</label>
                                            <input type="text" value="${model.name}" id="model-name-input-${brand.id}-${model.slug}">
                                        </div>
                                        <div class="input-group">
                                            <label class="floating-label">Slug</label>
                                            <input type="text" value="${model.slug}" id="model-slug-input-${brand.id}-${model.slug}">
                                        </div>
                                        ${renderCategoryDropdown(`model-category-input-${brand.id}-${model.slug}`, model.category)}
                                        <div class="form-actions-inline">
                                            <button class="btn-icon" onclick="saveModelName('${brand.id}', '${model.slug}')" title="Save">
                                                <i data-feather="check"></i>
                                            </button>
                                            <button class="btn-icon" onclick="cancelModelEdit('${brand.id}', '${model.slug}')" title="Cancel">
                                                <i data-feather="x"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="model-actions">
                                    ${!isModelEditing ? `<button class="btn-icon" onclick="editModel('${brand.id}', '${model.slug}'); event.stopPropagation();" title="Edit model">
                                        <i data-feather="edit-2"></i>
                                    </button>` : ''}
                                    <button class="btn-icon danger" onclick="deleteModelConfirm('${brand.id}', '${model.slug}'); event.stopPropagation();" title="Delete model">
                                        <i data-feather="trash-2"></i>
                                    </button>
                                </div>
                            </div>
                            `;
                        }).join('') : 
                        '<div class="empty-state"><p>No models added yet.</p></div>'
                    }
                    <div class="add-model-form" id="add-model-form-${brand.id}" style="display: none;">
                        <div class="inline-form">
                            <div class="input-group">
                                <label class="floating-label">Name</label>
                                <input type="text" placeholder="Enter model name..." id="new-model-input-${brand.id}">
                            </div>
                            <div class="input-group">
                                <label class="floating-label">Slug</label>
                                <input type="text" placeholder="auto-generated" id="new-model-slug-${brand.id}">
                            </div>
                            ${renderCategoryDropdown(`new-model-category-${brand.id}`, equipmentCategories[0])}
                            <div class="form-actions-inline">
                                <button class="btn-icon" onclick="saveNewModel('${brand.id}')" title="Add">
                                    <i data-feather="check"></i>
                                </button>
                                <button class="btn-icon" onclick="cancelNewModel('${brand.id}')" title="Cancel">
                                    <i data-feather="x"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
    
    // Add the "Add Brand" form at the end
    container.innerHTML += `
        <div class="brand-item" id="add-brand-form" style="display: none;">
            <div class="brand-header">
                <div class="brand-info">
                    <div class="inline-form">
                        <div class="input-group">
                            <label class="floating-label">Name</label>
                            <input type="text" placeholder="Enter brand name..." id="new-brand-input">
                        </div>
                        <div class="input-group">
                            <label class="floating-label">Slug</label>
                            <input type="text" placeholder="auto-generated" id="new-brand-slug">
                        </div>
                        <div class="form-actions-inline">
                            <button class="btn-icon" onclick="saveNewBrand()" title="Add">
                                <i data-feather="check"></i>
                            </button>
                            <button class="btn-icon" onclick="cancelNewBrand()" title="Cancel">
                                <i data-feather="x"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    feather.replace();
}

function toggleBrand(brandId) {
    if (expandedBrands.has(brandId)) {
        expandedBrands.delete(brandId);
    } else {
        expandedBrands.add(brandId);
    }
    renderBrandsList();
}

function editBrand(brandId) {
    editingBrandId = brandId;
    editingModelSlug = null;
    expandedBrands.add(brandId);
    renderBrandsList();
    const nameDisplay = document.getElementById(`brand-name-${brandId}`);
    const nameEdit = document.getElementById(`brand-name-edit-${brandId}`);
    const nameInput = document.getElementById(`brand-name-input-${brandId}`);
    const slugInput = document.getElementById(`brand-slug-input-${brandId}`);
    nameDisplay.style.display = 'none';
    nameEdit.style.display = 'block';
    nameInput.focus();
    nameInput.select();
    nameInput.addEventListener('input', function() {
        const slug = this.value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        slugInput.value = slug;
    });
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveBrandName(brandId);
        } else if (e.key === 'Escape') {
            cancelBrandEdit(brandId);
        }
    });
    slugInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveBrandName(brandId);
        } else if (e.key === 'Escape') {
            cancelBrandEdit(brandId);
        }
    });
}

function saveBrandName(brandId) {
    const nameInput = document.getElementById(`brand-name-input-${brandId}`);
    const slugInput = document.getElementById(`brand-slug-input-${brandId}`);
    const newName = nameInput.value.trim();
    const newSlug = slugInput.value.trim();
    const brand = brandModelManager.brands[brandId];
    
    if (newName && (newName !== brand.name || newSlug !== brandId)) {
        // Check if new slug conflicts with existing brands
        if (newSlug !== brandId && brandModelManager.brands[newSlug]) {
            showToast('Brand slug already exists!', 'error');
            slugInput.focus();
            return;
        }
        
        // If slug changed, we need to create new brand and delete old one
        if (newSlug !== brandId) {
            // Create new brand with new slug
            brandModelManager.addBrand(newSlug, newName);
            // Copy models to new brand
            brand.models.forEach(model => {
                brandModelManager.addModel(newSlug, model);
            });
            // Delete old brand
            brandModelManager.deleteBrand(brandId);
        } else {
            // Just update the name
            brandModelManager.updateBrand(brandId, newName);
        }
        
        showToast(`Brand updated successfully!`, 'success');
        renderBrandsList();
    } else {
        cancelBrandEdit(brandId);
    }
}

function cancelBrandEdit(brandId) {
    editingBrandId = null;
    editingModelSlug = null;
    renderBrandsList();
}

function editModel(brandId, modelSlug) {
    editingBrandId = brandId;
    editingModelSlug = modelSlug;
    expandedBrands.add(brandId);
    renderBrandsList();
    const nameDisplay = document.getElementById(`model-name-${brandId}-${modelSlug}`);
    const nameEdit = document.getElementById(`model-name-edit-${brandId}-${modelSlug}`);
    const input = document.getElementById(`model-name-input-${brandId}-${modelSlug}`);
    nameDisplay.style.display = 'none';
    nameEdit.style.display = 'block';
    input.focus();
    input.select();
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveModelName(brandId, modelSlug);
        } else if (e.key === 'Escape') {
            cancelModelEdit(brandId, modelSlug);
        }
    });
}

function saveModelName(brandId, modelSlug) {
    // Simulate save: show toast and exit edit mode
    showToast('Model updated successfully!', 'success');
    editingBrandId = null;
    editingModelSlug = null;
    renderBrandsList();
}

function cancelModelEdit(brandId, modelSlug) {
    editingBrandId = null;
    editingModelSlug = null;
    renderBrandsList();
}

function deleteModelConfirm(brandId, modelSlug) {
    const brand = brandModelManager.brands[brandId];
    if (!brand) return;
    
    const modelCount = brand.models.length;
    const message = modelCount > 1 ? 
        `Are you sure you want to delete "${modelSlug}"?\nThis will also delete ${modelCount - 1} model(s).` :
        `Are you sure you want to delete "${modelSlug}"?`;
    
    if (confirm(message)) {
        if (brandModelManager.deleteModel(brandId, modelSlug)) {
            renderBrandsList();
            showToast(`Model "${modelSlug}" deleted successfully!`, 'success');
        }
    }
}

// Handle hotspot size changes
function handleHotspotSizeChange() {
    const sizeSelect = document.getElementById('hotspotSize');
    hotspotScale = parseFloat(sizeSelect.value);
    
    // Re-render all hotspots with new size
    displayHotspots();
    
    // If a hotspot is selected, update its controls position
    if (selectedHotspot) {
        showHotspotControls(selectedHotspot);
    }
    
    showToast(`Hotspot size set to ${Math.round(hotspotScale * 100)}%`, 'success', 2000);
}