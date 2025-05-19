// 模拟数据
const mockData = [
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
    }
];

// DOM元素
const contentView = document.getElementById('content-view');
const listView = document.getElementById('list-view');
const contentImage = document.getElementById('content-image');
const currentLocation = document.getElementById('current-location');
const currentDate = document.getElementById('current-date');
const listButton = document.getElementById('list-button');
const contentList = document.getElementById('content-list');
const typeTabs = document.querySelectorAll('.tab');
const regionFilter = document.getElementById('region-filter');
const monthFilter = document.getElementById('month-filter');
const cropFilter = document.getElementById('crop-filter');

// 应用状态
let currentType = 'advisory';
let userRegion = 'henan'; // 模拟定位结果
let filters = {
    type: 'advisory',
    region: '',
    month: '',
    crop: ''
};

// 初始化应用
function initApp() {
    // 模拟获取用户位置
    getUserLocation();
    
    // 显示最新内容
    showLatestContent();
    
    // 绑定事件
    bindEvents();
}

// 获取用户位置（模拟）
function getUserLocation() {
    // 实际应用中应使用定位API
    setTimeout(() => {
        currentLocation.textContent = "河南郑州";
    }, 500);
}

// 显示最新内容
function showLatestContent() {
    // 根据用户地区获取最新内容
    const latestContent = mockData
        .filter(item => item.region === userRegion)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    
    if (latestContent) {
        contentImage.src = latestContent.content;
        currentDate.textContent = formatDate(latestContent.date);
    }
}

// 绑定事件处理
function bindEvents() {
    // 返回列表按钮
    listButton.addEventListener('click', () => {
        contentView.classList.remove('active');
        listView.classList.add('active');
        renderContentList();
    });
    
    // 类型切换
    typeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            typeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const type = tab.dataset.type;
            filters.type = type;
            updateCropFilterVisibility(type);
            renderContentList();
        });
    });
    
    // 筛选器变化
    regionFilter.addEventListener('change', updateFilters);
    monthFilter.addEventListener('change', updateFilters);
    cropFilter.addEventListener('change', updateFilters);
    
    // 初始化筛选器可见性
    updateCropFilterVisibility(currentType);
}

// 更新作物筛选器的可见性
function updateCropFilterVisibility(type) {
    if (type === 'advisory') {
        cropFilter.style.display = 'block';
    } else {
        cropFilter.style.display = 'none';
        filters.crop = '';
    }
}

// 更新筛选条件
function updateFilters() {
    filters.region = regionFilter.value;
    filters.month = monthFilter.value;
    filters.crop = cropFilter.value;
    
    renderContentList();
}

// 渲染内容列表
function renderContentList() {
    contentList.innerHTML = '';
    
    // 应用筛选
    let filteredData = mockData.filter(item => {
        if (filters.type && item.type !== filters.type) return false;
        if (filters.region && item.region !== filters.region) return false;
        if (filters.month) {
            const itemMonth = new Date(item.date).getMonth() + 1;
            if (itemMonth != filters.month) return false;
        }
        if (filters.crop && filters.type === 'advisory' && item.crop !== filters.crop) return false;
        
        return true;
    });
    
    // 渲染每个列表项
    filteredData.forEach(item => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerHTML = `
            <img class="item-image" src="${item.image}" alt="${item.title}">
            <div class="item-info">
                <div class="item-title">${item.title}</div>
                <div class="item-meta">
                    <div>${formatDate(item.date)}</div>
                    <div>
                        <span class="item-tag">${item.type === 'advisory' ? '农事建议' : '气象报告'}</span>
                        ${item.crop ? `<span class="item-tag">${getCropName(item.crop)}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
        
        // 点击列表项显示详情
        listItem.addEventListener('click', () => {
            contentImage.src = item.content;
            currentLocation.textContent = getRegionName(item.region);
            currentDate.textContent = formatDate(item.date);
            
            listView.classList.remove('active');
            contentView.classList.add('active');
        });
        
        contentList.appendChild(listItem);
    });
    
    // 如果没有内容
    if (filteredData.length === 0) {
        contentList.innerHTML = '<div class="empty-list">没有找到符合条件的内容</div>';
    }
}

// 格式化日期
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

// 获取作物名称
function getCropName(crop) {
    const cropNames = {
        'wheat': '小麦',
        'corn': '玉米',
        'rice': '水稻'
    };
    return cropNames[crop] || crop;
}

// 获取地区名称
function getRegionName(region) {
    const regionNames = {
        'henan': '河南',
        'shandong': '山东',
        'hebei': '河北'
    };
    return regionNames[region] || region;
}

// 启动应用
document.addEventListener('DOMContentLoaded', initApp); 