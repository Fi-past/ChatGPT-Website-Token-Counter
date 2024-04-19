

// 监听文档加载完成事件，确保HTML元素已经被加载和可以操作。
document.addEventListener('DOMContentLoaded', function () {
    // 获取表单元素，以便后续处理表单提交事件。
    const form = document.getElementById('options-form');
    // 获取开关输入元素，用于控制插件是否启用。
    const enableSwitch = document.getElementById('enable-switch');
    // 获取数字输入元素，用于设置刷新间隔。
    const refreshIntervalInput = document.getElementById('refresh-interval');

    // 从chrome.storage.sync中加载已保存的设置。
    chrome.storage.sync.get(['isEnabled', 'refreshInterval'], function (data) {
        // 设置开关状态，如果没有存储值则默认为true。
        enableSwitch.checked = data.isEnabled ?? true;
        // 设置刷新间隔，如果没有存储值则默认为10秒。
        refreshIntervalInput.value = data.refreshInterval ?? 10;
    });

    // 监听表单的提交事件。
    form.addEventListener('submit', function (event) {
        // 阻止表单的默认提交行为，因为我们将使用异步方式保存设置。
        event.preventDefault();
        // 读取开关当前的状态，这决定了插件是否应该启用。
        const isEnabled = enableSwitch.checked;
        // 读取用户输入的刷新间隔。
        const refreshInterval = refreshIntervalInput.value;
        // 将当前设置保存到chrome.storage.sync中。
        chrome.storage.sync.set({isEnabled, refreshInterval}, function () {
            // 数据保存后显示提示信息。
            // alert('设置已保存！');
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '设置已保存',
                showConfirmButton: false,
                timer: 1500,
            });

        });
    });
});
