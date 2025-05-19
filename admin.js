// 模拟数据
const adminMockData = [
    {
        id: 1,
        title: "6月小麦农事建议",
        type: "advisory",
        crop: "wheat",
        region: "henan",
        date: "2023-06-01",
        image: "https://via.placeholder.com/800x400?text=小麦农事建议",
        content: "WechatIMG25.jpg"
    },
    {
        id: 2,
        title: "6月玉米农事建议",
        type: "advisory",
        crop: "corn",
        region: "henan",
        date: "2023-06-05",
        image: "https://via.placeholder.com/800x400?text=玉米农事建议",
        content: "WechatIMG25.jpg"
    },
    {
        id: 3,
        title: "6月河南气象报告",
        type: "weather",
        region: "henan", 
        date: "2023-06-10",
        image: "https://via.placeholder.com/800x400?text=气象报告",
        content: "WechatIMG27.jpg"
    },
    {
        id: 4,
        title: "6月山东气象报告",
        type: "weather",
        region: "shandong",
        date: "2023-06-15",
        image: "https://via.placeholder.com/800x400?text=气象报告",
        content: "WechatIMG27.jpg"
    },
    {
        id: 5,
        title: "5月水稻农事建议",
        type: "advisory",
        crop: "rice",
        region: "henan",
        date: "2023-05-20",
        image: "https://via.placeholder.com/800x400?text=水稻农事建议",
        content: "WechatIMG25.jpg"
    },
    {
        id: 6,
        title: "4月小麦农事建议",
        type: "advisory",
        crop: "wheat",
        region: "shandong",
        date: "2023-04-18",
        image: "https://via.placeholder.com/800x400?text=小麦农事建议",
        content: "WechatIMG25.jpg"
    }
];

// 字典数据
let regionData = [
    { id: 1, code: 'henan', name: '河南' },
    { id: 2, code: 'shandong', name: '山东' },
    { id: 3, code: 'hebei', name: '河北' }
];

let cropData = [
    { id: 1, code: 'wheat', name: '小麦' },
    { id: 2, code: 'corn', name: '玉米' },
    { id: 3, code: 'rice', name: '水稻' }
];

// 应用状态
let editingItemId = null;
let editingRegionId = null;
let editingCropId = null;
let adminFilters = {
    type: '',
    region: '',
    crop: '',
    dateStart: '',
    dateEnd: ''
};

// DOM元素
const contentModal = document.getElementById('content-modal');
const modalTitle = document.getElementById('modal-title');
const contentForm = document.getElementById('content-form');
const addContentBtn = document.getElementById('add-content-btn');
const closeModalBtn = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const saveBtn = document.getElementById('save-btn');
const contentTableBody = document.getElementById('content-table-body');
const adminTypeFilter = document.getElementById('admin-type-filter');
const adminRegionFilter = document.getElementById('admin-region-filter');
const adminCropFilter = document.getElementById('admin-crop-filter');
const dateStart = document.getElementById('date-start');
const dateEnd = document.getElementById('date-end');
const cropFilterGroup = document.getElementById('crop-filter-group');
const resetFilterBtn = document.getElementById('reset-filter');
const applyFilterBtn = document.getElementById('apply-filter');
const cropGroup = document.getElementById('crop-group');
const contentImageUpload = document.getElementById('content-image-upload');
const imageFile = document.getElementById('image-file');
const imagePreview = document.getElementById('image-preview');
const previewImg = document.getElementById('preview-img');
const changeImageBtn = document.getElementById('change-image');
const typeRadios = document.getElementsByName('type');

// 预览相关
const previewModal = document.getElementById('preview-modal');
const closePreviewBtn = document.getElementById('close-preview');
const previewTitle = document.getElementById('preview-title');
const previewRegionDate = document.getElementById('preview-region-date');
const previewTypeCrop = document.getElementById('preview-type-crop');
const previewContentImg = document.getElementById('preview-content-img');

// 字典管理相关
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.main-content');
const dictTabs = document.querySelectorAll('.tab-header .tab');
const tabContents = document.querySelectorAll('.tab-content');
const regionTableBody = document.getElementById('region-table-body');
const cropTableBody = document.getElementById('crop-table-body');
const addRegionBtn = document.getElementById('add-region-btn');
const addCropBtn = document.getElementById('add-crop-btn');
const regionModal = document.getElementById('region-modal');
const cropModal = document.getElementById('crop-modal');
const regionModalTitle = document.getElementById('region-modal-title');
const cropModalTitle = document.getElementById('crop-modal-title');
const regionForm = document.getElementById('region-form');
const cropForm = document.getElementById('crop-form');
const regionCode = document.getElementById('region-code');
const regionName = document.getElementById('region-name');
const cropCode = document.getElementById('crop-code');
const cropName = document.getElementById('crop-name');
const closeRegionModalBtn = document.getElementById('close-region-modal');
const closeCropModalBtn = document.getElementById('close-crop-modal');
const cancelRegionBtn = document.getElementById('cancel-region-btn');
const cancelCropBtn = document.getElementById('cancel-crop-btn');
const saveRegionBtn = document.getElementById('save-region-btn');
const saveCropBtn = document.getElementById('save-crop-btn');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 加载内容表格数据
    renderContentTable();
    
    // 加载字典表格数据
    renderRegionTable();
    renderCropTable();
    
    // 更新下拉选择项
    updateRegionSelects();
    updateCropSelects();
    
    // 绑定事件
    bindAdminEvents();
    bindDictEvents();
});

// 绑定内容管理事件处理
function bindAdminEvents() {
    // 导航菜单切换
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const pageId = item.dataset.page;
            pages.forEach(page => {
                if (page.id === pageId) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
        });
    });
    
    // 打开新增内容弹窗
    addContentBtn.addEventListener('click', () => {
        openContentModal();
    });
    
    // 关闭弹窗
    closeModalBtn.addEventListener('click', () => {
        closeContentModal();
    });
    
    // 取消按钮
    cancelBtn.addEventListener('click', () => {
        closeContentModal();
    });
    
    // 保存按钮
    saveBtn.addEventListener('click', () => {
        saveContent();
    });
    
    // 类型选择切换作物字段可见性
    typeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            updateCropFieldVisibility(e.target.value);
        });
    });
    
    // 筛选器变化
    adminTypeFilter.addEventListener('change', (e) => {
        adminFilters.type = e.target.value;
        updateAdminCropFilterVisibility();
    });
    
    // 重置筛选
    resetFilterBtn.addEventListener('click', () => {
        resetFilters();
    });
    
    // 应用筛选
    applyFilterBtn.addEventListener('click', () => {
        applyFilters();
    });
    
    // 图片上传相关
    contentImageUpload.addEventListener('click', () => {
        imageFile.click();
    });
    
    imageFile.addEventListener('change', (e) => {
        handleImageUpload(e);
    });
    
    changeImageBtn.addEventListener('click', () => {
        imageFile.click();
    });
    
    // 关闭预览弹窗
    closePreviewBtn.addEventListener('click', () => {
        closePreviewModal();
    });
}

// 绑定字典管理事件处理
function bindDictEvents() {
    // 字典标签切换
    dictTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            dictTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabId = tab.dataset.tab;
            tabContents.forEach(content => {
                if (content.id === tabId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
    
    // 打开地区编辑弹窗
    addRegionBtn.addEventListener('click', () => {
        openRegionModal();
    });
    
    // 打开作物编辑弹窗
    addCropBtn.addEventListener('click', () => {
        openCropModal();
    });
    
    // 关闭地区弹窗
    closeRegionModalBtn.addEventListener('click', () => {
        closeRegionModal();
    });
    
    // 关闭作物弹窗
    closeCropModalBtn.addEventListener('click', () => {
        closeCropModal();
    });
    
    // 取消地区编辑
    cancelRegionBtn.addEventListener('click', () => {
        closeRegionModal();
    });
    
    // 取消作物编辑
    cancelCropBtn.addEventListener('click', () => {
        closeCropModal();
    });
    
    // 保存地区
    saveRegionBtn.addEventListener('click', () => {
        saveRegion();
    });
    
    // 保存作物
    saveCropBtn.addEventListener('click', () => {
        saveCrop();
    });
}

// 渲染内容表格
function renderContentTable() {
    contentTableBody.innerHTML = '';
    
    // 应用筛选
    const filteredData = filterAdminData();
    
    // 渲染每一行
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td><img src="${item.image}" alt="${item.title}" class="table-image"></td>
            <td>${item.title}</td>
            <td><span class="table-tag tag-${item.type}">${item.type === 'advisory' ? '农事建议' : '气象报告'}</span></td>
            <td>${getRegionName(item.region)}</td>
            <td>${item.crop ? getCropName(item.crop) : '-'}</td>
            <td>${formatDateFull(item.date)}</td>
            <td class="action-buttons">
                <button class="btn btn-preview" onclick="previewContent(${item.id})"><i class="bi bi-eye"></i> 预览</button>
                <button class="btn" onclick="editContent(${item.id})"><i class="bi bi-pencil"></i> 编辑</button>
                <button class="btn" onclick="deleteContent(${item.id})"><i class="bi bi-trash"></i> 删除</button>
            </td>
        `;
        contentTableBody.appendChild(row);
    });
}

// 渲染地区表格
function renderRegionTable() {
    regionTableBody.innerHTML = '';
    
    // 渲染每一行
    regionData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td class="action-buttons">
                <button class="btn" onclick="editRegion(${item.id})"><i class="bi bi-pencil"></i> 编辑</button>
                <button class="btn" onclick="deleteRegion(${item.id})"><i class="bi bi-trash"></i> 删除</button>
            </td>
        `;
        regionTableBody.appendChild(row);
    });
}

// 渲染作物表格
function renderCropTable() {
    cropTableBody.innerHTML = '';
    
    // 渲染每一行
    cropData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td class="action-buttons">
                <button class="btn" onclick="editCrop(${item.id})"><i class="bi bi-pencil"></i> 编辑</button>
                <button class="btn" onclick="deleteCrop(${item.id})"><i class="bi bi-trash"></i> 删除</button>
            </td>
        `;
        cropTableBody.appendChild(row);
    });
}

// 更新地区选择框
function updateRegionSelects() {
    // 筛选器中的地区选择
    adminRegionFilter.innerHTML = '<option value="">全部地区</option>';
    
    // 内容表单中的地区选择
    const regionSelect = document.getElementById('region');
    regionSelect.innerHTML = '<option value="">请选择地区</option>';
    
    // 添加选项
    regionData.forEach(item => {
        const option = `<option value="${item.code}">${item.name}</option>`;
        adminRegionFilter.insertAdjacentHTML('beforeend', option);
        regionSelect.insertAdjacentHTML('beforeend', option);
    });
}

// 更新作物选择框
function updateCropSelects() {
    // 筛选器中的作物选择
    adminCropFilter.innerHTML = '<option value="">全部作物</option>';
    
    // 内容表单中的作物选择
    const cropSelect = document.getElementById('crop');
    cropSelect.innerHTML = '<option value="">请选择作物</option>';
    
    // 添加选项
    cropData.forEach(item => {
        const option = `<option value="${item.code}">${item.name}</option>`;
        adminCropFilter.insertAdjacentHTML('beforeend', option);
        cropSelect.insertAdjacentHTML('beforeend', option);
    });
}

// 筛选内容数据
function filterAdminData() {
    return adminMockData.filter(item => {
        if (adminFilters.type && item.type !== adminFilters.type) return false;
        if (adminFilters.region && item.region !== adminFilters.region) return false;
        if (adminFilters.crop && item.type === 'advisory' && item.crop !== adminFilters.crop) return false;
        
        // 日期范围筛选
        if (adminFilters.dateStart) {
            const startDate = new Date(adminFilters.dateStart);
            const itemDate = new Date(item.date);
            if (itemDate < startDate) return false;
        }
        
        if (adminFilters.dateEnd) {
            const endDate = new Date(adminFilters.dateEnd);
            endDate.setDate(endDate.getDate() + 1); // 包含结束当天
            const itemDate = new Date(item.date);
            if (itemDate >= endDate) return false;
        }
        
        return true;
    });
}

// 更新筛选器
function updateAdminCropFilterVisibility() {
    if (adminFilters.type === 'advisory') {
        cropFilterGroup.style.display = 'block';
    } else {
        cropFilterGroup.style.display = 'none';
        adminFilters.crop = '';
        adminCropFilter.value = '';
    }
}

// 重置筛选器
function resetFilters() {
    adminTypeFilter.value = '';
    adminRegionFilter.value = '';
    adminCropFilter.value = '';
    dateStart.value = '';
    dateEnd.value = '';
    
    adminFilters = {
        type: '',
        region: '',
        crop: '',
        dateStart: '',
        dateEnd: ''
    };
    
    cropFilterGroup.style.display = 'block';
    renderContentTable();
}

// 应用筛选器
function applyFilters() {
    adminFilters = {
        type: adminTypeFilter.value,
        region: adminRegionFilter.value,
        crop: adminCropFilter.value,
        dateStart: dateStart.value,
        dateEnd: dateEnd.value
    };
    
    renderContentTable();
}

// 打开内容编辑弹窗
function openContentModal(itemId = null) {
    modalTitle.textContent = itemId ? '编辑内容' : '新增内容';
    editingItemId = itemId;
    
    // 重置表单
    contentForm.reset();
    imagePreview.style.display = 'none';
    previewImg.src = '';
    
    // 如果是编辑，填充表单
    if (itemId) {
        const item = adminMockData.find(i => i.id === itemId);
        if (item) {
            document.getElementById('title').value = item.title;
            document.querySelector(`input[name="type"][value="${item.type}"]`).checked = true;
            document.getElementById('region').value = item.region;
            document.getElementById('date').value = formatDateInput(item.date);
            
            if (item.crop) {
                document.getElementById('crop').value = item.crop;
            }
            
            // 显示图片预览
            previewImg.src = item.content;
            imagePreview.style.display = 'block';
            
            // 更新作物字段可见性
            updateCropFieldVisibility(item.type);
        }
    } else {
        // 默认选中农事建议
        document.querySelector('input[name="type"][value="advisory"]').checked = true;
        updateCropFieldVisibility('advisory');
    }
    
    // 显示弹窗
    contentModal.classList.add('active');
}

// 打开地区编辑弹窗
function openRegionModal(regionId = null) {
    regionModalTitle.textContent = regionId ? '编辑地区' : '新增地区';
    editingRegionId = regionId;
    
    // 重置表单
    regionForm.reset();
    
    // 如果是编辑，填充表单
    if (regionId) {
        const region = regionData.find(r => r.id === regionId);
        if (region) {
            regionCode.value = region.code;
            regionName.value = region.name;
        }
    }
    
    // 显示弹窗
    regionModal.classList.add('active');
}

// 打开作物编辑弹窗
function openCropModal(cropId = null) {
    cropModalTitle.textContent = cropId ? '编辑作物' : '新增作物';
    editingCropId = cropId;
    
    // 重置表单
    cropForm.reset();
    
    // 如果是编辑，填充表单
    if (cropId) {
        const crop = cropData.find(c => c.id === cropId);
        if (crop) {
            cropCode.value = crop.code;
            cropName.value = crop.name;
        }
    }
    
    // 显示弹窗
    cropModal.classList.add('active');
}

// 关闭内容弹窗
function closeContentModal() {
    contentModal.classList.remove('active');
    editingItemId = null;
}

// 关闭地区弹窗
function closeRegionModal() {
    regionModal.classList.remove('active');
    editingRegionId = null;
}

// 关闭作物弹窗
function closeCropModal() {
    cropModal.classList.remove('active');
    editingCropId = null;
}

// 保存内容
function saveContent() {
    // 获取表单数据
    const title = document.getElementById('title').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const region = document.getElementById('region').value;
    const date = document.getElementById('date').value;
    const crop = type === 'advisory' ? document.getElementById('crop').value : '';
    
    // 验证表单
    if (!title || !region || !date) {
        alert('请填写完整信息');
        return;
    }
    
    if (type === 'advisory' && !crop) {
        alert('请选择作物类型');
        return;
    }
    
    // 如果没有上传图片
    if (!previewImg.src && !editingItemId) {
        alert('请上传内容图片');
        return;
    }
    
    // 确定内容图片URL
    const contentImageUrl = type === 'advisory' ? 'WechatIMG25.jpg' : 'WechatIMG27.jpg';
    
    // 创建新数据
    if (editingItemId) {
        // 编辑现有数据
        const index = adminMockData.findIndex(item => item.id === editingItemId);
        if (index !== -1) {
            adminMockData[index] = {
                ...adminMockData[index],
                title,
                type,
                region,
                date,
                crop: type === 'advisory' ? crop : '',
                // 根据类型确定内容图片
                content: contentImageUrl
            };
        }
    } else {
        // 新增数据
        const newId = adminMockData.length > 0 ? Math.max(...adminMockData.map(item => item.id)) + 1 : 1;
        adminMockData.push({
            id: newId,
            title,
            type,
            region,
            date,
            crop: type === 'advisory' ? crop : '',
            image: `https://via.placeholder.com/800x400?text=${encodeURIComponent(title)}`,
            content: contentImageUrl
        });
    }
    
    // 关闭弹窗并刷新表格
    closeContentModal();
    renderContentTable();
}

// 保存地区
function saveRegion() {
    // 获取表单数据
    const code = regionCode.value.trim();
    const name = regionName.value.trim();
    
    // 验证表单
    if (!code || !name) {
        alert('请填写完整信息');
        return;
    }
    
    // 检查代码是否已存在
    const codeExists = regionData.some(r => r.code === code && r.id !== editingRegionId);
    if (codeExists) {
        alert('地区代码已存在，请更换');
        return;
    }
    
    // 保存数据
    if (editingRegionId) {
        // 编辑现有数据
        const index = regionData.findIndex(r => r.id === editingRegionId);
        if (index !== -1) {
            regionData[index] = {
                ...regionData[index],
                code,
                name
            };
        }
    } else {
        // 新增数据
        const newId = regionData.length > 0 ? Math.max(...regionData.map(r => r.id)) + 1 : 1;
        regionData.push({
            id: newId,
            code,
            name
        });
    }
    
    // 关闭弹窗并刷新数据
    closeRegionModal();
    renderRegionTable();
    updateRegionSelects();
}

// 保存作物
function saveCrop() {
    // 获取表单数据
    const code = cropCode.value.trim();
    const name = cropName.value.trim();
    
    // 验证表单
    if (!code || !name) {
        alert('请填写完整信息');
        return;
    }
    
    // 检查代码是否已存在
    const codeExists = cropData.some(c => c.code === code && c.id !== editingCropId);
    if (codeExists) {
        alert('作物代码已存在，请更换');
        return;
    }
    
    // 保存数据
    if (editingCropId) {
        // 编辑现有数据
        const index = cropData.findIndex(c => c.id === editingCropId);
        if (index !== -1) {
            cropData[index] = {
                ...cropData[index],
                code,
                name
            };
        }
    } else {
        // 新增数据
        const newId = cropData.length > 0 ? Math.max(...cropData.map(c => c.id)) + 1 : 1;
        cropData.push({
            id: newId,
            code,
            name
        });
    }
    
    // 关闭弹窗并刷新数据
    closeCropModal();
    renderCropTable();
    updateCropSelects();
}

// 编辑地区
function editRegion(id) {
    openRegionModal(id);
}

// 编辑作物
function editCrop(id) {
    openCropModal(id);
}

// 删除地区
function deleteRegion(id) {
    // 检查是否有内容使用此地区
    const isUsed = adminMockData.some(item => item.region === getRegionCode(id));
    if (isUsed) {
        alert('该地区已被内容使用，无法删除');
        return;
    }
    
    if (confirm('确定要删除该地区吗？')) {
        const index = regionData.findIndex(r => r.id === id);
        if (index !== -1) {
            regionData.splice(index, 1);
            renderRegionTable();
            updateRegionSelects();
        }
    }
}

// 删除作物
function deleteCrop(id) {
    // 检查是否有内容使用此作物
    const isUsed = adminMockData.some(item => item.crop === getCropCode(id));
    if (isUsed) {
        alert('该作物已被内容使用，无法删除');
        return;
    }
    
    if (confirm('确定要删除该作物吗？')) {
        const index = cropData.findIndex(c => c.id === id);
        if (index !== -1) {
            cropData.splice(index, 1);
            renderCropTable();
            updateCropSelects();
        }
    }
}

// 预览内容
function previewContent(id) {
    const item = adminMockData.find(i => i.id === id);
    if (!item) return;
    
    // 设置预览内容
    previewTitle.textContent = item.title;
    previewRegionDate.textContent = `${getRegionName(item.region)} - ${formatDate(item.date)}`;
    
    // 设置类型和作物信息
    let typeCropText = item.type === 'advisory' ? '农事建议' : '气象报告';
    if (item.crop) {
        typeCropText += ` - ${getCropName(item.crop)}`;
    }
    previewTypeCrop.textContent = typeCropText;
    
    // 设置内容图片
    previewContentImg.src = item.content;
    
    // 显示预览弹窗
    previewModal.classList.add('active');
}

// 关闭预览弹窗
function closePreviewModal() {
    previewModal.classList.remove('active');
}

// 获取地区代码
function getRegionCode(id) {
    const region = regionData.find(r => r.id === id);
    return region ? region.code : '';
}

// 获取作物代码
function getCropCode(id) {
    const crop = cropData.find(c => c.id === id);
    return crop ? crop.code : '';
}

// 编辑内容
function editContent(id) {
    openContentModal(id);
}

// 删除内容
function deleteContent(id) {
    if (confirm('确定要删除该内容吗？')) {
        const index = adminMockData.findIndex(item => item.id === id);
        if (index !== -1) {
            adminMockData.splice(index, 1);
            renderContentTable();
        }
    }
}

// 更新作物字段可见性
function updateCropFieldVisibility(type) {
    if (type === 'advisory') {
        cropGroup.style.display = 'block';
    } else {
        cropGroup.style.display = 'none';
    }
}

// 处理图片上传
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// 格式化日期（完整格式）
function formatDateFull(dateStr) {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

// 格式化日期（输入框格式）
function formatDateInput(dateStr) {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

// 格式化日期（年月格式）
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

// 获取作物名称
function getCropName(crop) {
    const cropItem = cropData.find(c => c.code === crop);
    return cropItem ? cropItem.name : crop;
}

// 获取地区名称
function getRegionName(region) {
    const regionItem = regionData.find(r => r.code === region);
    return regionItem ? regionItem.name : region;
}

// 为全局访问提供函数
window.editContent = editContent;
window.deleteContent = deleteContent;
window.previewContent = previewContent;
window.editRegion = editRegion;
window.deleteRegion = deleteRegion;
window.editCrop = editCrop;
window.deleteCrop = deleteCrop; 