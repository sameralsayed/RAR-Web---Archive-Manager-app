// script.js
const fakeFiles = [
    { id: 1, name: "vacation_photo.jpg", size: "4.8 MB", type: "Image" },
    { id: 2, name: "project_backup.rar", size: "128 MB", type: "Archive" },
    { id: 3, name: "report.pdf", size: "2.3 MB", type: "Document" },
    { id: 4, name: "family_video.mp4", size: "245 MB", type: "Video" },
    { id: 5, name: "notes.docx", size: "890 KB", type: "Document" }
];

let selectedFiles = [];

function renderFileList() {
    const tbody = document.getElementById('fileList');
    tbody.innerHTML = fakeFiles.map(file => `
        <tr>
            <td><input type="checkbox" class="file-check" data-id="${file.id}" onchange="toggleSelect(${file.id}, this)"></td>
            <td><i class="fas fa-file-${file.type === 'Image' ? 'image' : file.type === 'Archive' ? 'archive' : 'alt'} me-2"></i> ${file.name}</td>
            <td>${file.size}</td>
            <td><span class="badge bg-secondary">${file.type}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-dark" onclick="quickAction(${file.id})"><i class="fas fa-ellipsis-v"></i></button>
            </td>
        </tr>
    `).join('');
}

function toggleSelect(id, checkbox) {
    if (checkbox.checked) {
        selectedFiles.push(id);
    } else {
        selectedFiles = selectedFiles.filter(i => i !== id);
    }
}

function quickAction(id) {
    alert(`✅ File ${fakeFiles.find(f => f.id === id).name} selected for operation!`);
}

function launchDemo() {
    document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        renderFileList();
        document.querySelector('#demoTabs a').click();
    }, 600);
}

function createArchiveDemo() {
    const name = document.getElementById('archiveName').value || 'archive.rar';
    const format = document.getElementById('formatSelect').value.toUpperCase();
    
    document.getElementById('progressDemo').classList.remove('d-none');
    document.getElementById('resultsDemo').classList.add('d-none');
    
    const title = document.getElementById('operationTitle');
    title.innerHTML = `Creating <strong>${name}</strong> (${format})`;
    
    let progress = 0;
    const bar = document.getElementById('demoProgressBar');
    const text = document.getElementById('progressText');
    
    const interval = setInterval(() => {
        progress += Math.random() * 22;
        if (progress > 100) progress = 100;
        bar.style.width = `${progress}%`;
        text.textContent = `Compressing ${selectedFiles.length || 3} files • ${Math.floor(progress)}% complete`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                showResult(`🎉 ${name} created successfully! (${format} • ${Math.floor(Math.random()*150)} MB)`);
            }, 600);
        }
    }, 180);
}

function extractDemo() {
    document.getElementById('progressDemo').classList.remove('d-none');
    document.getElementById('resultsDemo').classList.add('d-none');
    
    const title = document.getElementById('operationTitle');
    title.textContent = 'Extracting sample_archive.rar';
    
    let progress = 0;
    const bar = document.getElementById('demoProgressBar');
    const text = document.getElementById('progressText');
    
    const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress > 100) progress = 100;
        bar.style.width = `${progress}%`;
        text.textContent = `Unpacking files • ${Math.floor(progress)}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                showResult('✅ Archive extracted! 12 files recovered.');
            }, 700);
        }
    }, 160);
}

function showResult(message) {
    document.getElementById('progressDemo').classList.add('d-none');
    const results = document.getElementById('resultsDemo');
    results.classList.remove('d-none');
    document.getElementById('resultMessage').innerHTML = message;
}

function resetDemo() {
    document.getElementById('resultsDemo').classList.add('d-none');
    document.getElementById('progressDemo').classList.add('d-none');
    selectedFiles = [];
    renderFileList();
}

function renderSampleArchives() {
    const container = document.getElementById('sampleArchives');
    const samples = [
        { name: 'backup.rar', icon: 'fas fa-file-archive' },
        { name: 'photos.zip', icon: 'fas fa-file-archive' },
        { name: 'documents.7z', icon: 'fas fa-file-archive' }
    ];
    container.innerHTML = samples.map(s => `
        <div onclick="selectArchive(this)" class="p-3 border border-2 rounded-3 text-center cursor-pointer" style="min-width:140px;">
            <i class="${s.icon} fa-3x text-warning mb-2"></i>
            <p class="mb-0 small">${s.name}</p>
        </div>
    `).join('');
}

function selectArchive(el) {
    document.querySelectorAll('#sampleArchives > div').forEach(d => d.classList.remove('border-warning'));
    el.classList.add('border-warning');
    document.getElementById('extractBtn').style.display = 'block';
}

// Initialize
window.onload = function() {
    renderFileList();
    renderSampleArchives();
    
    // Select all checkbox
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            document.querySelectorAll('.file-check').forEach(cb => {
                cb.checked = this.checked;
                toggleSelect(parseInt(cb.dataset.id), cb);
            });
        });
    }
    
    console.log('%c🚀 RAR Web loaded — full archiver simulation ready!', 'color:#ffc107; font-size:14px; font-weight:bold;');
};
