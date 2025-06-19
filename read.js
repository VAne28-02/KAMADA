document.addEventListener('DOMContentLoaded', () => {
    const calculationsHistory = JSON.parse(localStorage.getItem('calculationsHistory')) || [];
    const historyItemsContainer = document.getElementById('history-items');

    function renderHistory() {
        historyItemsContainer.innerHTML = calculationsHistory.length > 0 ? 
            calculationsHistory.map((calc, index) => `
                <div class="history-item">
                    <div class="history-content">
                        <div>${calc.expression} = <span class="history-result">${calc.result}</span></div>
                        <small>${calc.date}</small>
                    </div>
                    <div class="history-actions">
                        <a href="update.html?id=${index}" class="history-btn edit-btn">✏️</a>
                        <a href="delete.html?id=${index}" class="history-btn remove-btn">🗑️</a>
                    </div>
                </div>
            `).join('') : 
            '<p style="text-align:center;color:#888;">No hay cálculos guardados</p>';
    }

    renderHistory();
});
  
