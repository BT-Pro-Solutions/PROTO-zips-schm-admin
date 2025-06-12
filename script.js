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
        lastEditedDate: new Date("2024-01-15")
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
        lastEditedDate: new Date("2024-01-10")
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
        lastEditedDate: new Date("2024-01-08")
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
        lastEditedDate: new Date("2024-01-05")
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
        lastEditedDate: new Date("2024-01-03")
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
        lastEditedDate: new Date("2024-01-01")
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
        lastEditedDate: new Date("2023-12-28")
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
        lastEditedDate: new Date("2023-12-25")
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
        lastEditedDate: new Date("2023-12-20")
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
        lastEditedDate: new Date("2023-12-15")
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
        lastEditedDate: new Date("2023-12-10")
    }
];

// Global State
let currentData = [...dummyData];
let currentView = 'table';
let currentPage = 1;
let itemsPerPage = 5;
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
    renderData();
    updatePagination();
});

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
    
    currentPage = 1;
    renderData();
    updatePagination();
}

// Model filter functionality
function handleModelFilter() {
    const selectedModel = document.getElementById('modelFilter').value;
    
    if (selectedModel === 'all') {
        currentData = [...dummyData];
    } else {
        currentData = dummyData.filter(item => 
            item.associatedModels.includes(selectedModel)
        );
    }
    
    currentPage = 1;
    renderData();
    updatePagination();
}

// Sort functionality
function handleSort() {
    const sortBy = document.getElementById('sortBy').value;
    
    switch (sortBy) {
        case 'recent':
            currentData.sort((a, b) => new Date(b.lastEditedDate) - new Date(a.lastEditedDate));
            break;
        case 'name':
            currentData.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'attention':
            currentData.sort((a, b) => {
                if (a.needsAttention && !b.needsAttention) return -1;
                if (!a.needsAttention && b.needsAttention) return 1;
                return 0;
            });
            break;
    }
    
    renderData();
}

// Table column sorting
function sortTable(column) {
    if (sortColumn === column) {
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortOrder = 'asc';
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
        th.classList.remove('sort-asc', 'sort-desc');
    });
    
    // Add appropriate class to current sort column
    if (sortColumn) {
        // Find the header by matching the onclick attribute
        const headers = document.querySelectorAll('.schematics-table th[onclick]');
        headers.forEach(header => {
            const onclickValue = header.getAttribute('onclick');
            if (onclickValue && onclickValue.includes(`'${sortColumn}'`)) {
                header.classList.add('sort-' + sortOrder);
            }
        });
    }
}

// View toggle functionality
function toggleView(view) {
    currentView = view;
    
    // Update active button
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(view + 'ViewBtn').classList.add('active');
    
    // Show/hide views
    document.querySelectorAll('.view-container').forEach(container => container.classList.remove('active'));
    document.getElementById(view + 'View').classList.add('active');
    
    renderData();
}

// Pagination
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderData();
        updatePagination();
    }
}

function nextPage() {
    const totalPages = Math.ceil(currentData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderData();
        updatePagination();
    }
}

function updatePagination() {
    const totalPages = Math.ceil(currentData.length / itemsPerPage);
    const pageInfo = `Page ${currentPage} of ${totalPages}`;
    
    document.getElementById('pageInfo').textContent = pageInfo;
    document.getElementById('pageInfoGrid').textContent = pageInfo;
    
    const prevBtns = [document.getElementById('prevBtn'), document.getElementById('prevBtnGrid')];
    const nextBtns = [document.getElementById('nextBtn'), document.getElementById('nextBtnGrid')];
    
    prevBtns.forEach(btn => {
        btn.disabled = currentPage === 1;
    });
    
    nextBtns.forEach(btn => {
        btn.disabled = currentPage === totalPages || totalPages === 0;
    });
}

// Render data based on current view
function renderData() {
    if (currentView === 'table') {
        renderTableView();
    } else {
        renderGridView();
    }
}

// Render table view
function renderTableView() {
    const tbody = document.getElementById('schematicsTableBody');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = currentData.slice(startIndex, endIndex);
    
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
            <td>
                <img src="${item.image}" alt="${item.name}" class="clickable-image" onclick="openImageView('${item.image}', '${item.name}')" /><br>
                <small class="${imageSizeClass}">${item.imageSize}</small>
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
}

// Render grid view
function renderGridView() {
    const grid = document.getElementById('schematicsGrid');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = currentData.slice(startIndex, endIndex);
    
    grid.innerHTML = '';
    
    pageData.forEach(item => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.innerHTML = `
            <div class="grid-item-image">
                <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="grid-item-content">
                <h3 class="grid-item-title">${item.name}</h3>
                <div class="grid-item-details">
                    <div class="grid-item-models">
                        <strong>Models:</strong> ${item.associatedModels.join(', ')}
                    </div>
                    <div><strong>Parts:</strong> ${item.partCount}</div>
                    <div><strong>Size:</strong> ${item.imageSize}</div>
                    <div><strong>Last edited:</strong> ${formatDate(item.lastEditedDate)} by ${item.lastEditedBy}</div>
                </div>
                <div class="grid-item-actions">
                    <span class="status-badge ${item.needsAttention ? 'status-attention' : 'status-good'}">
                        <i data-feather="${item.needsAttention ? 'alert-triangle' : 'check-circle'}"></i>
                        ${item.needsAttention ? 'Needs Attention' : 'Good'}
                    </span>
                    <div class="action-buttons">
                        <button class="btn btn-tertiary" onclick="editSchematic(${item.id})">
                            <i data-feather="edit"></i>
                        </button>
                        <button class="btn btn-tertiary" onclick="deleteSchematic(${item.id})">
                            <i data-feather="trash-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(gridItem);
    });
    
    // Re-initialize Feather icons
    feather.replace();
}

// Global state for modal
let currentSchematicId = null;
let isEditMode = false;
let selectedDepartments = [];
let mockAINumbers = [];
let partsData = [];

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

// Modal functionality
function openSchematicModal(id = null) {
    currentSchematicId = id;
    isEditMode = id !== null;
    
    const modal = document.getElementById('schematicModal');
    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');
    const settingsGroup = document.getElementById('settingsGroup');
    
    // Reset form and state
    document.getElementById('schematicForm').reset();
    selectedDepartments = [];
    mockAINumbers = [];
    partsData = [];
    
    // Update modal for add/edit mode
    if (isEditMode) {
        modalTitle.textContent = 'Edit Schematic';
        submitBtn.textContent = 'Update Schematic';
        settingsGroup.style.display = 'block';
        populateEditForm(id);
    } else {
        modalTitle.textContent = 'Add New Schematic';
        submitBtn.textContent = 'Add Schematic';
        settingsGroup.style.display = 'none';
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
    mockAINumbers = [];
    partsData = [];
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
    
    // If there's an existing image, show preview
    if (schematic.image) {
        showImagePreview(schematic.image);
        
        // Mock some AI-detected numbers for demonstration
        mockAINumbers = [
            { number: '1', x: 20, y: 30, confidence: 0.95 },
            { number: '2', x: 60, y: 25, confidence: 0.88 },
            { number: '3', x: 40, y: 70, confidence: 0.92 }
        ];
        
        // Mock parts data
        partsData = [
            { schematicNumber: '1', partSku: 'ABC-123', quantity: '2', parentSku: '', confidence: 0.95, positionX: 20, positionY: 30 },
            { schematicNumber: '2', partSku: 'DEF-456', quantity: '1', parentSku: 'ABC-123', confidence: 0.88, positionX: 60, positionY: 25 },
            { schematicNumber: '3', partSku: '', quantity: '', parentSku: '', confidence: 0.92, positionX: 40, positionY: 70 }
        ];
        
        displayNumberOverlays();
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
    container.innerHTML = '';
    
    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.className = 'department-suggestion';
            div.textContent = suggestion;
            div.onclick = () => {
                addDepartment(suggestion);
                document.getElementById('schematicDepartment').value = '';
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
    document.getElementById('departmentSuggestions').style.display = 'none';
}

// Close modal when clicking outside or handle other clicks
document.addEventListener('click', function(event) {
    const schematicModal = document.getElementById('schematicModal');
    const imageViewModal = document.getElementById('imageViewModal');
    const suggestionsContainer = document.getElementById('departmentSuggestions');
    const departmentInput = document.getElementById('schematicDepartment');
    
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
        
        if (schematicModal && schematicModal.classList.contains('active')) {
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
        uploadContainer.addEventListener(eventName, unhighlight, false);
    });
    
    uploadContainer.addEventListener('drop', handleDrop, false);
    
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

function showImagePreview(imageSrc) {
    const container = document.getElementById('imagePreviewContainer');
    const previewImg = document.getElementById('previewImage');
    
    previewImg.src = imageSrc;
    container.style.display = 'block';
    
    // Add click handler for position selection
    previewImg.addEventListener('click', handleSchematicClick);
    
    // Clear any existing overlays
    document.getElementById('numberOverlays').innerHTML = '';
    mockAINumbers = [];
    partsData = [];
    
    // Expand the diagram section
    expandSection('diagram');
}

// Mock AI number scanning
function scanForNumbers() {
    // Warn user about clearing existing parts
    if (partsData.length > 0) {
        if (!confirm('Re-scanning will clear all existing parts data. Are you sure you want to continue?')) {
            return;
        }
    }
    
    // Mock AI detection with random positions
    mockAINumbers = [
        { number: '1', x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, confidence: 0.95 },
        { number: '2', x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, confidence: 0.88 },
        { number: '3', x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, confidence: 0.92 },
        { number: '4', x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, confidence: 0.76 },
        { number: '5', x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, confidence: 0.83 }
    ];
    
    // Initialize parts data with position information
    partsData = mockAINumbers.map(num => ({
        schematicNumber: num.number,
        partSku: '',
        quantity: '',
        parentSku: '',
        confidence: num.confidence,
        positionX: Math.round(num.x),
        positionY: Math.round(num.y)
    }));
    
    displayNumberOverlays();
    updatePartsTable();
    document.getElementById('partsTableContainer').style.display = 'block';
}

function displayNumberOverlays() {
    const container = document.getElementById('numberOverlays');
    container.innerHTML = '';
    
    mockAINumbers.forEach(num => {
        const overlay = document.createElement('div');
        overlay.className = 'number-overlay';
        overlay.style.left = num.x + '%';
        overlay.style.top = num.y + '%';
        overlay.textContent = num.number;
        container.appendChild(overlay);
    });
}

// Parts table management
function updatePartsTable() {
    const tbody = document.getElementById('partsTableBody');
    tbody.innerHTML = '';
    
    partsData.forEach((part, index) => {
        const row = document.createElement('tr');
        
        const confidenceClass = part.confidence > 0.9 ? 'confidence-high' : 
                              part.confidence > 0.7 ? 'confidence-medium' : 'confidence-low';
        
        // Check if row has missing required data
        const isMissingData = !part.partSku || 
                            !part.quantity || 
                            (!part.positionX && part.positionX !== 0) || 
                            (!part.positionY && part.positionY !== 0) ||
                            (part.positionX === 0 && part.positionY === 0);
        
        if (isMissingData) {
            row.classList.add('part-row-warning');
        }
        
        row.innerHTML = `
            <td><input type="text" value="${part.schematicNumber}" onchange="updatePartData(${index}, 'schematicNumber', this.value)" readonly class="input-readonly"></td>
            <td><input type="text" value="${part.partSku}" onchange="updatePartData(${index}, 'partSku', this.value)" placeholder="Enter SKU" class="input-small"></td>
            <td><input type="number" value="${part.quantity}" onchange="updatePartData(${index}, 'quantity', this.value)" placeholder="Qty" min="1" class="input-qty"></td>
            <td><input type="text" value="${part.parentSku}" onchange="updatePartData(${index}, 'parentSku', this.value)" placeholder="Parent SKU" class="input-small"></td>
            <td>
                <div class="position-container">
                    <small class="position-display">X:${part.positionX || 0}% Y:${part.positionY || 0}%</small>
                    <button type="button" class="btn-position" onclick="startPositionSelection(${index})" title="Click to set position on schematic">
                        <i data-feather="crosshair"></i>
                    </button>
                </div>
            </td>
            <td><span class="confidence-score ${confidenceClass}">${Math.round(part.confidence * 100)}%</span></td>
            <td><button type="button" class="btn btn-tertiary" onclick="removePartRow(${index})"><i data-feather="trash-2"></i></button></td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Re-initialize feather icons
    feather.replace();
}

function updatePartData(index, field, value) {
    if (partsData[index]) {
        partsData[index][field] = value;
        // Refresh the table to update warning highlights
        updatePartsTable();
    }
}

function addPartRow() {
    const newNumber = String(partsData.length + 1);
    partsData.push({
        schematicNumber: newNumber,
        partSku: '',
        quantity: '',
        parentSku: '',
        confidence: 1.0, // Manual entries have 100% confidence
        positionX: 0,
        positionY: 0
    });
    
    updatePartsTable();
}

function removePartRow(index) {
    partsData.splice(index, 1);
    updatePartsTable();
}

// Position selection functionality
function startPositionSelection(index) {
    positionSelectionMode = true;
    currentPositionIndex = index;
    
    // Add visual indicator to the image
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.classList.add('position-selection-mode');
    
    // Update button text to indicate selection mode
    const button = event.target.closest('.btn-position');
    button.innerHTML = '<i data-feather="target"></i>';
    button.title = 'Click on the schematic image to set position';
    feather.replace();
    
    // Show instruction
    showToast('Click on the schematic image to set the position for this part.', 'info', 8000);
}

function handleSchematicClick(event) {
    if (!positionSelectionMode) return;
    
    const imagePreview = document.getElementById('previewImage');
    const rect = imagePreview.getBoundingClientRect();
    
    // Calculate percentage position
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    // Update the part data
    if (currentPositionIndex >= 0 && partsData[currentPositionIndex]) {
        partsData[currentPositionIndex].positionX = Math.round(x);
        partsData[currentPositionIndex].positionY = Math.round(y);
        
        // Also update the corresponding mockAINumbers entry for visual overlay
        const schematicNumber = partsData[currentPositionIndex].schematicNumber;
        const mockNumberIndex = mockAINumbers.findIndex(num => num.number === schematicNumber);
        if (mockNumberIndex >= 0) {
            mockAINumbers[mockNumberIndex].x = Math.round(x);
            mockAINumbers[mockNumberIndex].y = Math.round(y);
        }
        
        // Refresh the visual overlays immediately
        displayNumberOverlays();
    }
    
    // Exit selection mode
    exitPositionSelectionMode();
    
    // Update the table to reflect changes
    updatePartsTable();
    
    // Show success toast
    showToast('Position updated successfully!', 'success', 3000);
}

function exitPositionSelectionMode() {
    positionSelectionMode = false;
    currentPositionIndex = -1;
    
    // Remove visual indicator from image
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.classList.remove('position-selection-mode');
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
            { schematicNumber: '1', partSku: 'OCR-ABC-123', quantity: '2', parentSku: '', confidence: 0.85, positionX: 15, positionY: 45 },
            { schematicNumber: '2', partSku: 'OCR-DEF-456', quantity: '1', parentSku: 'OCR-ABC-123', confidence: 0.91, positionX: 55, positionY: 20 },
            { schematicNumber: '3', partSku: 'OCR-GHI-789', quantity: '3', parentSku: '', confidence: 0.78, positionX: 75, positionY: 80 }
        ];
        
        // Merge with existing data or replace
        if (confirm('OCR processing complete. Replace existing parts data with extracted data?')) {
            partsData = ocrData;
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
        parts: partsData
    };
    
    if (isEditMode) {
        updateSchematic(currentSchematicId, schematicData);
    } else {
        addNewSchematic(schematicData);
    }
    
    closeSchematicModal();
    renderData();
    updatePagination();
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
            const totalPages = Math.ceil(currentData.length / itemsPerPage);
            if (currentPage > totalPages && totalPages > 0) {
                currentPage = totalPages;
            }
            
            renderData();
            updatePagination();
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