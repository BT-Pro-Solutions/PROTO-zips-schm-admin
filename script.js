// Dummy Data for Schematics
const dummyData = [
    {
        id: 1,
        name: "Hydraulic Lift Assembly",
        image: "https://via.placeholder.com/300x200/007bff/ffffff?text=Hydraulic+Lift",
        imageSize: "2.4 MB",
        associatedModels: ["Jerr-Dan", "Century Steel Carrier"],
        partCount: 45,
        needsAttention: true,
        lastEditedBy: "john.doe",
        lastEditedDate: new Date("2024-01-15")
    },
    {
        id: 2,
        name: "Winch Control System",
        image: "https://via.placeholder.com/300x200/28a745/ffffff?text=Winch+Control",
        imageSize: "1.8 MB",
        associatedModels: ["Jerr-Dan"],
        partCount: 32,
        needsAttention: false,
        lastEditedBy: "jane.smith",
        lastEditedDate: new Date("2024-01-10")
    },
    {
        id: 3,
        name: "Boom Extension Mechanism",
        image: "https://via.placeholder.com/300x200/ffc107/000000?text=Boom+Extension",
        imageSize: "3.1 MB",
        associatedModels: ["Century Steel Carrier", "Miller Industries"],
        partCount: 28,
        needsAttention: true,
        lastEditedBy: "mike.wilson",
        lastEditedDate: new Date("2024-01-08")
    },
    {
        id: 4,
        name: "Safety Override Panel",
        image: "https://via.placeholder.com/300x200/dc3545/ffffff?text=Safety+Panel",
        imageSize: "1.2 MB",
        associatedModels: ["Jerr-Dan", "Miller Industries"],
        partCount: 18,
        needsAttention: false,
        lastEditedBy: "sarah.johnson",
        lastEditedDate: new Date("2024-01-05")
    },
    {
        id: 5,
        name: "Electrical Harness Layout",
        image: "https://via.placeholder.com/300x200/6f42c1/ffffff?text=Electrical+Harness",
        imageSize: "4.2 MB",
        associatedModels: ["Century Steel Carrier"],
        partCount: 67,
        needsAttention: false,
        lastEditedBy: "tom.brown",
        lastEditedDate: new Date("2024-01-03")
    },
    {
        id: 6,
        name: "Cab Door Assembly",
        image: "https://via.placeholder.com/300x200/20c997/ffffff?text=Cab+Door",
        imageSize: "2.9 MB",
        associatedModels: ["Jerr-Dan"],
        partCount: 23,
        needsAttention: true,
        lastEditedBy: "lisa.davis",
        lastEditedDate: new Date("2024-01-01")
    },
    {
        id: 7,
        name: "Hydraulic Tank Configuration",
        image: "https://via.placeholder.com/300x200/fd7e14/ffffff?text=Hydraulic+Tank",
        imageSize: "1.7 MB",
        associatedModels: ["Miller Industries"],
        partCount: 15,
        needsAttention: false,
        lastEditedBy: "david.garcia",
        lastEditedDate: new Date("2023-12-28")
    },
    {
        id: 8,
        name: "Control Module Wiring",
        image: "https://via.placeholder.com/300x200/e83e8c/ffffff?text=Control+Wiring",
        imageSize: "3.6 MB",
        associatedModels: ["Jerr-Dan", "Century Steel Carrier", "Miller Industries"],
        partCount: 52,
        needsAttention: true,
        lastEditedBy: "amy.martinez",
        lastEditedDate: new Date("2023-12-25")
    },
    {
        id: 9,
        name: "Outrigger Positioning System",
        image: "https://via.placeholder.com/300x200/6610f2/ffffff?text=Outrigger+System",
        imageSize: "2.1 MB",
        associatedModels: ["Century Steel Carrier"],
        partCount: 34,
        needsAttention: false,
        lastEditedBy: "chris.lee",
        lastEditedDate: new Date("2023-12-20")
    },
    {
        id: 10,
        name: "Emergency Stop Circuit",
        image: "https://via.placeholder.com/300x200/dc3545/ffffff?text=Emergency+Stop",
        imageSize: "0.9 MB",
        associatedModels: ["Jerr-Dan", "Miller Industries"],
        partCount: 12,
        needsAttention: false,
        lastEditedBy: "robert.taylor",
        lastEditedDate: new Date("2023-12-15")
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
    
    currentData.sort((a, b) => {
        let aValue = a[column];
        let bValue = b[column];
        
        if (column === 'lastEditedDate') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }
        
        if (column === 'needsAttention') {
            aValue = aValue ? 1 : 0;
            bValue = bValue ? 1 : 0;
        }
        
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });
    
    renderData();
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
                    ${item.needsAttention ? 'Needs Attention' : 'Good'}
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