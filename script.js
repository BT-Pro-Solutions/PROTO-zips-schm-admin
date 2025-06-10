// Dummy Data for Schematics
const dummyData = [
    {
        id: 1,
        name: "Hydraulic Lift Assembly",
        image: "schematics/Cable Roller Assembly.jpg",
        imageSize: "2048x1536",
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
        imageSize: "1440x1080",
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
            case 'imageSize':
                // Convert size to bytes for proper sorting
                aValue = parseFloat(a.imageSize);
                bValue = parseFloat(b.imageSize);
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
        row.innerHTML = `
            <td>
                <strong>${item.name}</strong><br>
                <small class="text-secondary">Parts: ${item.partCount}</small>
            </td>
            <td>
                <img src="${item.image}" alt="${item.name}" />
            </td>
            <td>${item.imageSize}</td>
            <td>
                <span class="status-badge ${item.needsAttention ? 'status-attention' : 'status-good'}">
                    <i data-feather="${item.needsAttention ? 'alert-triangle' : 'check-circle'}"></i>
                </span>
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

// Modal functionality
function openAddSchematicModal() {
    document.getElementById('addSchematicModal').classList.add('active');
}

function closeAddSchematicModal() {
    document.getElementById('addSchematicModal').classList.remove('active');
    document.getElementById('addSchematicForm').reset();
}

// Handle add schematic form submission
function handleAddSchematic(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const newSchematic = {
        id: Math.max(...dummyData.map(item => item.id)) + 1,
        name: document.getElementById('schematicName').value,
        image: document.getElementById('schematicImage').value,
        imageSize: '2.0 MB', // Default size
        associatedModels: document.getElementById('schematicModels').value.split(',').map(s => s.trim()).filter(s => s),
        partCount: parseInt(document.getElementById('schematicPartCount').value),
        needsAttention: document.getElementById('schematicNeedsAttention').checked,
        lastEditedBy: 'current.user',
        lastEditedDate: new Date()
    };
    
    dummyData.unshift(newSchematic);
    currentData = [...dummyData];
    
    closeAddSchematicModal();
    renderData();
    updatePagination();
    
    alert('Schematic added successfully!');
}

// Edit schematic (placeholder)
function editSchematic(id) {
    const schematic = dummyData.find(item => item.id === id);
    if (schematic) {
        alert(`Edit functionality would open for: ${schematic.name}`);
        // In a real application, this would open an edit modal or navigate to an edit page
    }
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
            alert('Schematic deleted successfully!');
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

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('addSchematicModal');
    if (event.target === modal) {
        closeAddSchematicModal();
    }
});

// Handle escape key to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAddSchematicModal();
    }
});