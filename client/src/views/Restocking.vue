<template>
  <div class="restocking">
    <div class="page-header">
      <h2>Restocking Recommendations</h2>
      <p>Generate purchase order suggestions that balance low stock, demand forecasts, and budget ceilings.</p>
    </div>

    <div class="control-row">
      <div class="budget-card">
        <label for="budget">Budget ceiling</label>
        <input
          id="budget"
          type="number"
          min="0"
          step="100"
          v-model.number="budget"
          placeholder="Enter budget"
        />
      </div>
      <button class="refresh-btn" @click="loadData">Refresh</button>
    </div>

    <div v-if="loading" class="loading">Loading restocking recommendations...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Recommended SKUs</div>
          <div class="stat-value">{{ recommendations.length }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Estimated spend</div>
          <div class="stat-value">${{ formatNumber(totalSpend) }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Budget used</div>
          <div class="stat-value">${{ formatNumber(budgetUsed) }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Budget remaining</div>
          <div class="stat-value">${{ formatNumber(budgetRemaining) }}</div>
        </div>
      </div>

      <div v-if="recommendations.length === 0" class="no-data">
        No restocking recommendations match the current filters and budget ceiling.
      </div>

      <div v-else class="table-container">
        <table class="recommendations-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Item</th>
              <th>Warehouse</th>
              <th>Category</th>
              <th>On hand</th>
              <th>Reorder point</th>
              <th>Forecast</th>
              <th>Suggested qty</th>
              <th>Est. cost</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in recommendations" :key="item.sku">
              <td>{{ item.sku }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.warehouse }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.quantity_on_hand }}</td>
              <td>{{ item.reorder_point }}</td>
              <td>{{ item.forecasted_demand }} ({{ item.trend }})</td>
              <td>{{ item.suggested_order_qty }}</td>
              <td>${{ formatNumber(item.estimated_cost) }}</td>
              <td>{{ item.recommendation_reason }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useFilters } from '../composables/useFilters'
import { api } from '../api'

export default {
  name: 'Restocking',
  setup() {
    const loading = ref(true)
    const error = ref(null)
    const budget = ref(0)
    const recommendations = ref([])
    const budgetUsed = ref(0)
    const budgetRemaining = ref(0)

    const {
      selectedPeriod,
      selectedLocation,
      selectedCategory,
      selectedStatus,
      getCurrentFilters
    } = useFilters()

    const totalSpend = computed(() => {
      return recommendations.value.reduce((sum, item) => sum + (Number(item.estimated_cost) || 0), 0)
    })

    const formatNumber = (value) => {
      const number = Number(value) || 0
      const formatted = number.toFixed(2)
      const [intPart, decPart] = formatted.split('.')
      return `${intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${decPart}`
    }

    const loadData = async () => {
      loading.value = true
      error.value = null

      try {
        const filters = getCurrentFilters()
        const response = await api.getRestockingRecommendations(filters, budget.value)
        recommendations.value = response.recommendations || []
        budgetUsed.value = response.budget_used || 0
        budgetRemaining.value = response.budget_remaining != null ? response.budget_remaining : 0
      } catch (err) {
        error.value = `Unable to load recommendations: ${err.message}`
      } finally {
        loading.value = false
      }
    }

    watch([selectedPeriod, selectedLocation, selectedCategory, selectedStatus, budget], loadData)
    onMounted(loadData)

    return {
      loading,
      error,
      budget,
      recommendations,
      budgetUsed,
      budgetRemaining,
      totalSpend,
      formatNumber,
      loadData
    }
  }
}
</script>

<style scoped>
.restocking {
  padding: 0;
}

.page-header {
  margin-bottom: 1.5rem;
}

.page-header h2 {
  margin-bottom: 0.5rem;
  color: #0f172a;
}

.page-header p {
  color: #475569;
}

.control-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 1.5rem;
}

.budget-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 240px;
}

.budget-card label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
}

.budget-card input {
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background: white;
}

.refresh-btn {
  border: none;
  padding: 0.85rem 1.25rem;
  border-radius: 10px;
  background: #2563eb;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.refresh-btn:hover {
  background: #1d4ed8;
}

.loading,
.error,
.no-data {
  padding: 1.25rem 1.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  color: #334155;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
  border-left: 4px solid #2563eb;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
}

.table-container {
  overflow-x: auto;
  background: white;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}

.recommendations-table {
  width: 100%;
  border-collapse: collapse;
}

.recommendations-table th,
.recommendations-table td {
  padding: 0.9rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.recommendations-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #475569;
}

.recommendations-table tr:hover {
  background: #f8fafc;
}

.recommendations-table td {
  color: #334155;
}
</style>
