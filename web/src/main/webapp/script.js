// Sample data
let users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        status: "active",
        joinDate: "2024-01-15",
        balance: 12345.67,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        status: "active",
        joinDate: "2024-01-10",
        balance: 8765.43,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    },
    {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        role: "user",
        status: "inactive",
        joinDate: "2024-01-05",
        balance: 2345.89,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah@example.com",
        role: "user",
        status: "active",
        joinDate: "2023-12-20",
        balance: 15678.9,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
]

const transactions = [
    {
        id: 1,
        type: "credit",
        amount: 2500,
        description: "Salary Deposit",
        date: "2024-01-15",
        status: "completed",
        category: "income",
        icon: "fas fa-briefcase",
    },
    {
        id: 2,
        type: "debit",
        amount: 150,
        description: "Grocery Store",
        date: "2024-01-14",
        status: "completed",
        category: "shopping",
        icon: "fas fa-shopping-cart",
    },
    {
        id: 3,
        type: "debit",
        amount: 75,
        description: "Gas Station",
        date: "2024-01-13",
        status: "completed",
        category: "transport",
        icon: "fas fa-gas-pump",
    },
    {
        id: 4,
        type: "credit",
        amount: 200,
        description: "Freelance Payment",
        date: "2024-01-12",
        status: "completed",
        category: "income",
        icon: "fas fa-laptop",
    },
    {
        id: 5,
        type: "debit",
        amount: 1200,
        description: "Rent Payment",
        date: "2024-01-10",
        status: "completed",
        category: "bills",
        icon: "fas fa-home",
    },
]

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light"
    document.documentElement.setAttribute("data-theme", savedTheme)
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)

    // Add a subtle animation effect
    document.body.style.transition = "all 0.3s ease"
    setTimeout(() => {
        document.body.style.transition = ""
    }, 300)
}

function logout() {
    showLoadingScreen()
    setTimeout(() => {
        localStorage.removeItem("isAuthenticated")
        localStorage.removeItem("userRole")
        window.location.href = "index.html"
    }, 1000)
}

// Loading Screen
function showLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen")
    if (loadingScreen) {
        loadingScreen.classList.add("active")
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen")
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.remove("active")
        }, 1500)
    }
}

// Shake animation for error states
const shakeKeyframes = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`
const styleSheet = document.createElement("style")
styleSheet.textContent = shakeKeyframes
document.head.appendChild(styleSheet)

// Enhanced Password toggle functionality
function togglePassword() {
    const passwordInput = document.getElementById("password")
    const passwordIcon = document.getElementById("passwordIcon")

    if (passwordInput.type === "password") {
        passwordInput.type = "text"
        passwordIcon.className = "fas fa-eye-slash"
    } else {
        passwordInput.type = "password"
        passwordIcon.className = "fas fa-eye"
    }

    // Add a subtle animation
    passwordIcon.style.transform = "scale(0.8)"
    setTimeout(() => {
        passwordIcon.style.transform = "scale(1)"
    }, 150)
}

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0
    const increment = target / (duration / 16)
    let current = start

    const timer = setInterval(() => {
        current += increment
        if (current >= target) {
            current = target
            clearInterval(timer)
        }

        if (element.textContent.includes("$")) {
            element.textContent = `$${current.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`
        } else {
            element.textContent = Math.floor(current).toLocaleString()
        }
    }, 16)
}

function initCounters() {
    const counters = document.querySelectorAll(".counter")

    const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = Number.parseFloat(entry.target.dataset.target)
                animateCounter(entry.target, target)
                observer.unobserve(entry.target)
            }
        })
    }, observerOptions)

    counters.forEach((counter) => {
        observer.observe(counter)
    })
}

// Enhanced Load transactions for dashboard
function loadTransactions() {
    const transactionsList = document.getElementById("transactionsList")
    if (!transactionsList) return

    transactionsList.innerHTML = ""

    transactions.forEach((transaction, index) => {
        const transactionElement = document.createElement("div")
        transactionElement.className = "transaction-item"
        transactionElement.style.animationDelay = `${index * 0.1}s`

        transactionElement.innerHTML = `
      <div class="transaction-info">
        <div class="transaction-icon ${transaction.type}">
          <i class="${transaction.icon}"></i>
        </div>
        <div class="transaction-details">
          <h4>${transaction.description}</h4>
          <p>${formatDate(transaction.date)} • ${transaction.category}</p>
        </div>
      </div>
      <div class="transaction-amount">
        <div class="amount-value">
          ${transaction.type === "credit" ? "+" : "-"}$${transaction.amount.toFixed(2)}
        </div>
        <div class="status-badge active">${transaction.status}</div>
      </div>
    `

        transactionElement.classList.add("fade-in-up")
        transactionsList.appendChild(transactionElement)
    })
}

// Enhanced Load users for admin panel
function loadUsers() {
    const usersList = document.getElementById("usersList")
    if (!usersList) return

    usersList.innerHTML = ""

    users.forEach((user, index) => {
        const userElement = document.createElement("div")
        userElement.className = "user-item"
        userElement.style.animationDelay = `${index * 0.1}s`

        userElement.innerHTML = `
      <div class="user-info">
        <div class="user-icon">
          <img src="${user.avatar}" alt="${user.name}" style="width: 100%; height: 100%; border-radius: 12px; object-fit: cover;">
        </div>
        <div class="user-details">
          <h4>${user.name}</h4>
          <p>${user.email}</p>
          <p style="font-size: 12px; color: var(--text-tertiary);">Joined: ${formatDate(user.joinDate)}</p>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 20px;">
        <div style="text-align: right;">
          <div style="font-weight: 700; font-size: 18px; margin-bottom: 4px; color: var(--text-primary);">
            $${user.balance.toLocaleString()}
          </div>
          <div>
            <span class="status-badge ${user.status}">${user.status}</span>
            <span class="role-badge">${user.role}</span>
          </div>
        </div>
        <div class="user-actions">
          <button class="action-btn" onclick="toggleUserStatus(${user.id})" title="Toggle Status">
            <i class="fas fa-toggle-${user.status === "active" ? "on" : "off"}"></i>
          </button>
          <button class="action-btn" onclick="editUser(${user.id})" title="Edit User">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete" onclick="deleteUser(${user.id})" title="Delete User">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `

        userElement.classList.add("fade-in-up")
        usersList.appendChild(userElement)
    })
}

// Enhanced Update admin stats
function updateStats() {
    const totalUsersEl = document.getElementById("totalUsersCounter")
    const activeUsersEl = document.getElementById("activeUsersCounter")
    const activeRateEl = document.getElementById("activeRateDisplay")
    const totalDepositsEl = document.getElementById("totalDepositsDisplay")
    const avgBalanceEl = document.getElementById("avgBalanceDisplay")

    if (!totalUsersEl) return

    const totalUsers = users.length
    const activeUsers = users.filter((user) => user.status === "active").length
    const activeRate = Math.round((activeUsers / totalUsers) * 100)
    const totalDeposits = users.reduce((sum, user) => sum + user.balance, 0)
    const avgBalance = totalDeposits / totalUsers

    // Set counter targets
    totalUsersEl.dataset.target = totalUsers
    activeUsersEl.dataset.target = activeUsers

    activeRateEl.innerHTML = `
    <i class="fas fa-arrow-up"></i>
    <span>${activeRate}% active rate</span>
  `
    totalDepositsEl.textContent = `$${totalDeposits.toLocaleString()}`
    avgBalanceEl.textContent = `$${Math.round(avgBalance).toLocaleString()}`
}

// User management functions with enhanced animations
function toggleUserStatus(userId) {
    const user = users.find((u) => u.id === userId)
    if (user) {
        user.status = user.status === "active" ? "inactive" : "active"

        // Add success notification
        showNotification(`User ${user.name} status updated to ${user.status}`, "success")

        loadUsers()
        updateStats()
        initCounters()
    }
}

function editUser(userId) {
    const user = users.find((u) => u.id === userId)
    if (user) {
        // Pre-fill the modal with user data
        document.getElementById("userName").value = user.name
        document.getElementById("userEmail").value = user.email
        document.getElementById("userRole").value = user.role
        document.getElementById("initialBalance").value = user.balance

        // Change modal title and button text
        document.querySelector(".modal-title h3").textContent = "Edit User"
        document.querySelector(".submit-btn span").textContent = "Update User Account"

        // Store the user ID for updating
        document.getElementById("addUserForm").dataset.editingUserId = userId

        openAddUserModal()
    }
}

function deleteUser(userId) {
    const user = users.find((u) => u.id === userId)
    if (user && confirm(`Are you sure you want to delete ${user.name}'s account? This action cannot be undone.`)) {
        users = users.filter((u) => u.id !== userId)

        showNotification(`User ${user.name} has been deleted`, "error")

        loadUsers()
        updateStats()
        initCounters()
    }
}

// Enhanced Modal functions
function openAddUserModal() {
    const modal = document.getElementById("addUserModal")
    modal.style.display = "block"

    // Add opening animation
    setTimeout(() => {
        modal.querySelector(".premium-modal").style.animation = "modalSlideIn 0.3s ease-out"
    }, 10)

    // Focus first input
    setTimeout(() => {
        document.getElementById("firstName").focus()
    }, 300)
}

function closeAddUserModal() {
    const modal = document.getElementById("addUserModal")
    const modalContent = modal.querySelector(".premium-modal")

    // Add closing animation
    modalContent.style.animation = "modalSlideOut 0.3s ease-in"

    setTimeout(() => {
        modal.style.display = "none"

        // Reset modal to add mode
        document.querySelector(".modal-title h3").textContent = "Create New User"
        document.querySelector(".submit-btn span").textContent = "Create User Account"
        delete document.getElementById("addUserForm").dataset.editingUserId
    }, 300)
}

// Add closing animation keyframes
const modalKeyframes = `
  @keyframes modalSlideOut {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(-50px) scale(0.9);
    }
  }
`
const modalStyleSheet = document.createElement("style")
modalStyleSheet.textContent = modalKeyframes
document.head.appendChild(modalStyleSheet)

// Enhanced Add user form submission
if (document.getElementById("addUserForm")) {
    document.getElementById("addUserForm").addEventListener("submit", (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const editingUserId = e.target.dataset.editingUserId

        if (editingUserId) {
            // Update existing user
            const user = users.find((u) => u.id === Number.parseInt(editingUserId))
            if (user) {
                user.name = formData.get("userName")
                user.email = formData.get("userEmail")
                user.role = formData.get("userRole")
                user.balance = Number.parseFloat(formData.get("initialBalance")) || user.balance

                showNotification(`User ${user.name} updated successfully`, "success")
            }
        } else {
            // Create new user
            const newUser = {
                id: Math.max(...users.map((u) => u.id)) + 1,
                name: formData.get("userName"),
                email: formData.get("userEmail"),
                role: formData.get("userRole"),
                status: "active",
                joinDate: new Date().toISOString().split("T")[0],
                balance: Number.parseFloat(formData.get("initialBalance")) || 0,
                avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=40&h=40&fit=crop&crop=face`,
            }

            users.push(newUser)
            showNotification(`User ${newUser.name} created successfully`, "success")
        }

        loadUsers()
        updateStats()
        initCounters()
        closeAddUserModal()
    })
}

// Notification System
function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `

    // Add notification styles
    const notificationStyles = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--glass-bg);
      backdrop-filter: var(--backdrop-blur);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      padding: 16px;
      box-shadow: var(--shadow-xl);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 12px;
      max-width: 400px;
      animation: slideInRight 0.3s ease-out;
    }
    
    .notification-success {
      border-left: 4px solid var(--success-color);
    }
    
    .notification-error {
      border-left: 4px solid var(--error-color);
    }
    
    .notification-info {
      border-left: 4px solid var(--primary-color);
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
    }
    
    .notification-content i {
      color: var(--${type === "success" ? "success" : type === "error" ? "error" : "primary"}-color);
    }
    
    .notification-close {
      background: none;
      border: none;
      color: var(--text-tertiary);
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: all 0.2s ease;
    }
    
    .notification-close:hover {
      background: var(--bg-tertiary);
      color: var(--text-primary);
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `

    if (!document.getElementById("notification-styles")) {
        const notificationStyleSheet = document.createElement("style")
        notificationStyleSheet.id = "notification-styles"
        notificationStyleSheet.textContent = notificationStyles
        document.head.appendChild(notificationStyleSheet)
    }

    document.body.appendChild(notification)

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = "slideOutRight 0.3s ease-in"
            setTimeout(() => {
                notification.remove()
            }, 300)
        }
    }, 5000)
}

// Utility Functions
function formatDate(dateString) {
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
}

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount)
}

// Dashboard initialization
function initDashboard() {
    // Add some interactive elements
    const cards = document.querySelectorAll(".premium-card")
    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-8px) scale(1.02)"
        })

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) scale(1)"
        })
    })
}

// Admin initialization
function initAdmin() {
    // Add search functionality
    const searchInput = document.querySelector(".users-header .search-input")
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const searchTerm = e.target.value.toLowerCase()
            const userItems = document.querySelectorAll(".user-item")

            userItems.forEach((item) => {
                const userName = item.querySelector(".user-details h4").textContent.toLowerCase()
                const userEmail = item.querySelector(".user-details p").textContent.toLowerCase()

                if (userName.includes(searchTerm) || userEmail.includes(searchTerm)) {
                    item.style.display = "flex"
                } else {
                    item.style.display = "none"
                }
            })
        })
    }

    // Add filter functionality
    const filterBtns = document.querySelectorAll(".users-header .filter-btn")
    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons
            filterBtns.forEach((b) => b.classList.remove("active"))
            // Add active class to clicked button
            btn.classList.add("active")

            const filter = btn.textContent.toLowerCase()
            const userItems = document.querySelectorAll(".user-item")

            userItems.forEach((item) => {
                const userStatus = item.querySelector(".status-badge").textContent.toLowerCase()

                if (filter === "all users" || userStatus === filter) {
                    item.style.display = "flex"
                } else {
                    item.style.display = "none"
                }
            })
        })
    })
}

// Close modal when clicking outside
window.onclick = (event) => {
    const modal = document.getElementById("addUserModal")
    if (event.target === modal) {
        closeAddUserModal()
    }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initTheme()
    hideLoadingScreen()

    // const currentPage = window.location.pathname.split("/").pop()

    // if (currentPage === "dashboard.html") {
    //   checkAuth("user")
    //   loadTransactions()
    //   initCounters()
    //   initDashboard()
    // } else if (currentPage === "admin.html") {
    //   checkAuth("admin")
    //   loadUsers()
    //   updateStats()
    //   initCounters()
    //   initAdmin()
    // }
})

// Add some premium interactions
document.addEventListener("mousemove", (e) => {
    const shapes = document.querySelectorAll(".shape")
    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5
        const x = mouseX * speed
        const y = mouseY * speed

        shape.style.transform = `translate(${x}px, ${y}px)`
    })
})

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        const searchInput = document.querySelector(".search-input")
        if (searchInput) {
            searchInput.focus()
        }
    }

    // Escape to close modal
    if (e.key === "Escape") {
        const modal = document.getElementById("addUserModal")
        if (modal && modal.style.display === "block") {
            closeAddUserModal()
        }
    }

    // Ctrl/Cmd + Shift + T to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "T") {
        e.preventDefault()
        toggleTheme()
    }
})

// Premium Transfer Functionality
const accountBalances = {
    checking: 8234.5,
    savings: 4111.17,
}

const transferHistory = []

// Initialize Transfer Functionality
function initTransferSystem() {
    // Tab switching with premium animations
    const transferTabs = document.querySelectorAll(".transfer-tab")
    const transferTabContents = document.querySelectorAll(".transfer-tab-content")

    transferTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const targetTab = tab.dataset.tab

            // Remove active class from all tabs and contents
            transferTabs.forEach((t) => t.classList.remove("active"))
            transferTabContents.forEach((content) => content.classList.remove("active"))

            // Add active class to clicked tab and corresponding content
            tab.classList.add("active")
            document.getElementById(`${targetTab}-tab`).classList.add("active")

            // Add premium transition effect
            const activeContent = document.getElementById(`${targetTab}-tab`)
            activeContent.style.transform = "translateY(20px)"
            activeContent.style.opacity = "0"

            setTimeout(() => {
                activeContent.style.transform = "translateY(0)"
                activeContent.style.opacity = "1"
            }, 100)
        })
    })

    // Quick Transfer Form
    const quickTransferForm = document.getElementById("quickTransferForm")
    if (quickTransferForm) {
        quickTransferForm.addEventListener("submit", handleQuickTransfer)
    }

    // Amount input animations
    const amountInput = document.getElementById("transferAmount")
    if (amountInput) {
        amountInput.addEventListener("focus", () => {
            amountInput.parentElement.style.transform = "scale(1.02)"
            createParticleEffect(amountInput.parentElement)
        })

        amountInput.addEventListener("blur", () => {
            amountInput.parentElement.style.transform = "scale(1)"
        })

        amountInput.addEventListener("input", (e) => {
            const value = Number.parseFloat(e.target.value)
            if (value > 0) {
                updateTransferPreview(value)
            }
        })
    }
}

// Handle Quick Transfer with Premium Animations
async function handleQuickTransfer(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const transferData = {
        fromAccount: formData.get("fromAccount"),
        toAccount: formData.get("toAccount"),
        amount: Number.parseFloat(formData.get("transferAmount")),
        note: formData.get("transferNote") || "",
    }

    // Validate transfer
    if (!validateTransfer(transferData)) {
        return
    }

    const transferBtn = document.querySelector(".transfer-btn")
    const transferContainer = document.querySelector(".transfer-container")

    // Start loading animation
    transferBtn.classList.add("loading")
    transferBtn.disabled = true

    // Create money flow animation
    createMoneyFlowAnimation(transferContainer)

    try {
        // Simulate transfer processing
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Update account balances
        accountBalances[transferData.fromAccount] -= transferData.amount
        updateAccountDisplays()

        // Add to transfer history
        transferHistory.unshift({
            id: Date.now(),
            ...transferData,
            timestamp: new Date(),
            status: "completed",
        })

        // Success animation
        transferBtn.classList.remove("loading")
        transferBtn.classList.add("success")

        // Create success effects
        createSuccessConfetti()
        showTransferSuccess(transferData)

        // Reset form after delay
        setTimeout(() => {
            transferBtn.classList.remove("success")
            transferBtn.disabled = false
            e.target.reset()

            // Update transactions list
            addTransferToTransactionsList(transferData)
        }, 3000)
    } catch (error) {
        transferBtn.classList.remove("loading")
        transferBtn.disabled = false
        showNotification("Transfer failed. Please try again.", "error")
    }
}

// Validate Transfer
function validateTransfer(transferData) {
    const {fromAccount, amount, toAccount} = transferData

    if (amount <= 0) {
        showNotification("Please enter a valid amount", "error")
        return false
    }

    if (amount > accountBalances[fromAccount]) {
        showNotification("Insufficient funds", "error")
        return false
    }

    if (!toAccount || toAccount.trim() === "") {
        showNotification("Please enter a recipient", "error")
        return false
    }

    return true
}

// Create Money Flow Animation
function createMoneyFlowAnimation(container) {
    const moneyFlow = document.createElement("div")
    moneyFlow.className = "money-flow"
    container.style.position = "relative"
    container.appendChild(moneyFlow)

    setTimeout(() => {
        moneyFlow.remove()
    }, 2000)
}

// Create Particle Effect
function createParticleEffect(element) {
    const particles = document.createElement("div")
    particles.className = "transfer-particles"
    element.style.position = "relative"
    element.appendChild(particles)

    for (let i = 0; i < 10; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.left = Math.random() * 100 + "%"
        particle.style.animationDelay = Math.random() * 2 + "s"
        particles.appendChild(particle)
    }

    setTimeout(() => {
        particles.remove()
    }, 3000)
}

// Create Success Confetti
function createSuccessConfetti() {
    const colors = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"]

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div")
        confetti.className = "confetti"
        confetti.style.left = Math.random() * 100 + "vw"
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.animationDelay = Math.random() * 3 + "s"
        confetti.style.animationDuration = Math.random() * 3 + 2 + "s"
        document.body.appendChild(confetti)

        setTimeout(() => {
            confetti.remove()
        }, 6000)
    }
}

// Show Transfer Success
function showTransferSuccess(transferData) {
    const successModal = document.createElement("div")
    successModal.className = "success-modal"
    successModal.innerHTML = `
    <div class="success-modal-content">
      <div class="success-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3>Transfer Successful!</h3>
      <p>$${transferData.amount.toFixed(2)} sent to ${transferData.toAccount}</p>
      <div class="success-details">
        <div class="detail-item">
          <span>From:</span>
          <span>${transferData.fromAccount.charAt(0).toUpperCase() + transferData.fromAccount.slice(1)} Account</span>
        </div>
        <div class="detail-item">
          <span>Fee:</span>
          <span class="free">Free</span>
        </div>
        <div class="detail-item">
          <span>Status:</span>
          <span class="completed">Completed</span>
        </div>
      </div>
      <button class="close-success-btn" onclick="closeSuccessModal()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `

    // Add success modal styles
    const successStyles = `
    .success-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease-out;
    }
    
    .success-modal-content {
      background: var(--glass-bg);
      backdrop-filter: var(--backdrop-blur);
      border: 1px solid var(--glass-border);
      border-radius: 24px;
      padding: 40px;
      text-align: center;
      max-width: 400px;
      width: 90%;
      position: relative;
      animation: successSlideIn 0.5s ease-out;
    }
    
    .success-icon {
      width: 80px;
      height: 80px;
      background: var(--gradient-success);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 32px;
      color: white;
      animation: successPulse 0.6s ease-out;
    }
    
    .success-modal-content h3 {
      font-size: 24px;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 8px;
    }
    
    .success-modal-content p {
      color: var(--text-secondary);
      margin-bottom: 24px;
      font-size: 16px;
    }
    
    .success-details {
      background: var(--bg-tertiary);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }
    
    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: 14px;
    }
    
    .detail-item:last-child {
      margin-bottom: 0;
    }
    
    .detail-item span:first-child {
      color: var(--text-secondary);
    }
    
    .detail-item span:last-child {
      font-weight: 600;
      color: var(--text-primary);
    }
    
    .free {
      color: var(--success-color) !important;
    }
    
    .completed {
      color: var(--success-color) !important;
    }
    
    .close-success-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .close-success-btn:hover {
      background: var(--glass-bg-hover);
      color: var(--text-primary);
    }
    
    @keyframes successSlideIn {
      from {
        opacity: 0;
        transform: translateY(-50px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes successPulse {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  `

    if (!document.getElementById("success-modal-styles")) {
        const successStyleSheet = document.createElement("style")
        successStyleSheet.id = "success-modal-styles"
        successStyleSheet.textContent = successStyles
        document.head.appendChild(successStyleSheet)
    }

    document.body.appendChild(successModal)

    // Auto close after 5 seconds
    setTimeout(() => {
        closeSuccessModal()
    }, 5000)
}

// Close Success Modal
function closeSuccessModal() {
    const modal = document.querySelector(".success-modal")
    if (modal) {
        modal.style.animation = "fadeOut 0.3s ease-in"
        setTimeout(() => {
            modal.remove()
        }, 300)
    }
}

// Update Account Displays
function updateAccountDisplays() {
    const checkingCard = document.querySelector('[data-target="8234.50"]')
    const savingsCard = document.querySelector('[data-target="4111.17"]')

    if (checkingCard) {
        checkingCard.textContent = `$${accountBalances.checking.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`
    }

    if (savingsCard) {
        savingsCard.textContent = `$${accountBalances.savings.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`
    }
}

// Set Amount from Quick Buttons
function setAmount(amount) {
    const amountInput = document.getElementById("transferAmount")
    if (amountInput) {
        amountInput.value = amount
        amountInput.focus()

        // Add premium animation
        amountInput.style.transform = "scale(1.05)"
        setTimeout(() => {
            amountInput.style.transform = "scale(1)"
        }, 200)

        updateTransferPreview(amount)
    }
}

// Update Transfer Preview
function updateTransferPreview(amount) {
    const feeElement = document.querySelector(".transfer-fee")
    if (feeElement && amount > 0) {
        feeElement.style.opacity = "1"
        feeElement.style.transform = "translateY(0)"
    }
}

// Swap Accounts
function swapAccounts() {
    const fromSelect = document.getElementById("fromAccount")
    const toInput = document.getElementById("toAccount")

    if (fromSelect && toInput) {
        const fromValue = fromSelect.value
        const toValue = toInput.value

        // Only swap if to field contains an account type
        if (toValue === "checking" || toValue === "savings") {
            fromSelect.value = toValue
            toInput.value = fromValue
        }

        // Add swap animation
        const swapBtn = document.querySelector(".swap-accounts-btn")
        swapBtn.style.transform = "rotate(180deg) scale(1.1)"
        setTimeout(() => {
            swapBtn.style.transform = "rotate(0deg) scale(1)"
        }, 300)
    }
}

// Select Recipient
function selectRecipient(email, name) {
    const toInput = document.getElementById("toAccount")
    if (toInput) {
        toInput.value = email
        toInput.focus()

        // Add selection animation
        toInput.style.borderColor = "var(--success-color)"
        setTimeout(() => {
            toInput.style.borderColor = "var(--border-color)"
        }, 1000)

        showNotification(`Selected ${name} as recipient`, "success")
    }
}

// Show Contacts
function showContacts() {
    showNotification("Contact list feature coming soon!", "info")
}

// Show Add Recipient
function showAddRecipient() {
    showNotification("Add recipient feature coming soon!", "info")
}

// Show Transfer History
function showTransferHistory() {
    if (transferHistory.length === 0) {
        showNotification("No transfer history available", "info")
        return
    }

    showNotification(`You have ${transferHistory.length} recent transfers`, "info")
}

// Add Transfer to Transactions List
function addTransferToTransactionsList(transferData) {
    const transactionsList = document.getElementById("transactionsList")
    if (!transactionsList) return

    const newTransaction = {
        id: Date.now(),
        type: "debit",
        amount: transferData.amount,
        description: `Transfer to ${transferData.toAccount}`,
        date: new Date().toISOString().split("T")[0],
        status: "completed",
        category: "transfer",
        icon: "fas fa-paper-plane",
    }

    // Add to transactions array
    transactions.unshift(newTransaction)

    // Reload transactions with animation
    loadTransactions()
}

// Create Scheduled Transfer
function createScheduledTransfer() {
    showNotification("Scheduled transfer feature coming soon!", "info")
}

// Initialize transfer system when dashboard loads
if (window.location.pathname.includes("dashboard.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
            initTransferSystem()
        }, 500)
    })
}

// Premium Transfer Modal System
let currentTransferStep = 1
let selectedAccount = "checking"
let transferModalData = {
    amount: 0,
    fromAccount: "checking",
    toRecipient: "",
    note: "",
}

// Open Transfer Modal
function openTransferModal() {
    const modal = document.getElementById("transferModal")
    if (modal) {
        modal.style.display = "block"
        document.body.style.overflow = "hidden"

        // Reset modal state
        currentTransferStep = 1
        selectedAccount = "checking"
        updateTransferStep()

        // Focus on amount input
        setTimeout(() => {
            const amountInput = document.getElementById("modalTransferAmount")
            if (amountInput) {
                amountInput.focus()
            }
        }, 300)
    }
}

// Close Transfer Modal
function closeTransferModal() {
    const modal = document.getElementById("transferModal")
    if (modal) {
        modal.style.animation = "fadeOut 0.3s ease-in"
        setTimeout(() => {
            modal.style.display = "none"
            modal.style.animation = ""
            document.body.style.overflow = ""
            resetTransferModal()
        }, 300)
    }
}

// Reset Transfer Modal
function resetTransferModal() {
    currentTransferStep = 1
    selectedAccount = "checking"
    transferModalData = {
        amount: 0,
        fromAccount: "checking",
        toRecipient: "",
        note: "",
    }

    // Reset form
    const form = document.getElementById("modalTransferForm")
    if (form) {
        form.reset()
    }

    // Reset account selection
    document.querySelectorAll(".account-option").forEach((option) => {
        option.classList.remove("active")
    })
    document.querySelector('[data-account="checking"]').classList.add("active")

    updateTransferStep()
}

// Update Transfer Step
function updateTransferStep() {
    // Update step indicators
    document.querySelectorAll(".step").forEach((step, index) => {
        const stepNumber = index + 1
        step.classList.remove("active", "completed")

        if (stepNumber < currentTransferStep) {
            step.classList.add("completed")
        } else if (stepNumber === currentTransferStep) {
            step.classList.add("active")
        }
    })

    // Update step lines
    document.querySelectorAll(".step-line").forEach((line, index) => {
        line.classList.remove("completed")
        if (index + 1 < currentTransferStep) {
            line.classList.add("completed")
        }
    })

    // Show/hide step content
    document.querySelectorAll(".transfer-step-content").forEach((content, index) => {
        content.classList.remove("active")
        if (index + 1 === currentTransferStep) {
            content.classList.add("active")
        }
    })

    // Update navigation buttons
    const prevBtn = document.getElementById("prevBtn")
    const nextBtn = document.getElementById("nextBtn")
    const confirmBtn = document.getElementById("confirmBtn")

    if (currentTransferStep === 1) {
        prevBtn.style.display = "none"
        nextBtn.style.display = "flex"
        confirmBtn.style.display = "none"
    } else if (currentTransferStep === 2) {
        prevBtn.style.display = "flex"
        nextBtn.style.display = "flex"
        confirmBtn.style.display = "none"
    } else if (currentTransferStep === 3) {
        prevBtn.style.display = "flex"
        nextBtn.style.display = "none"
        confirmBtn.style.display = "flex"
        updateConfirmationDetails()
    }
}

// Next Step
function nextStep() {
    if (validateCurrentStep()) {
        if (currentTransferStep < 3) {
            currentTransferStep++
            updateTransferStep()

            // Add step transition animation
            const activeContent = document.querySelector(".transfer-step-content.active")
            if (activeContent) {
                activeContent.style.transform = "translateX(30px)"
                activeContent.style.opacity = "0"
                setTimeout(() => {
                    activeContent.style.transform = "translateX(0)"
                    activeContent.style.opacity = "1"
                }, 100)
            }
        }
    }
}

// Previous Step
function previousStep() {
    if (currentTransferStep > 1) {
        currentTransferStep--
        updateTransferStep()

        // Add step transition animation
        const activeContent = document.querySelector(".transfer-step-content.active")
        if (activeContent) {
            activeContent.style.transform = "translateX(-30px)"
            activeContent.style.opacity = "0"
            setTimeout(() => {
                activeContent.style.transform = "translateX(0)"
                activeContent.style.opacity = "1"
            }, 100)
        }
    }
}

// Validate Current Step
function validateCurrentStep() {
    if (currentTransferStep === 1) {
        const amount = Number.parseFloat(document.getElementById("modalTransferAmount").value)
        if (!amount || amount <= 0) {
            showNotification("Please enter a valid amount", "error")
            return false
        }
        if (amount > accountBalances[selectedAccount]) {
            showNotification("Insufficient funds", "error")
            return false
        }
        transferModalData.amount = amount
        transferModalData.fromAccount = selectedAccount
        return true
    } else if (currentTransferStep === 2) {
        const recipient = document.getElementById("modalRecipient").value.trim()
        if (!recipient) {
            showNotification("Please enter a recipient", "error")
            return false
        }
        transferModalData.toRecipient = recipient
        transferModalData.note = document.getElementById("modalTransferNote").value.trim()
        return true
    }
    return true
}

// Set Modal Amount
function setModalAmount(amount) {
    const amountInput = document.getElementById("modalTransferAmount")
    if (amountInput) {
        amountInput.value = amount
        amountInput.focus()

        // Add premium animation
        amountInput.style.transform = "scale(1.05)"
        setTimeout(() => {
            amountInput.style.transform = "scale(1)"
        }, 200)

        // Create particle effect
        createAmountParticleEffect(amountInput.parentElement)
    }
}

// Create Amount Particle Effect
function createAmountParticleEffect(element) {
    const particles = document.createElement("div")
    particles.className = "amount-particles"
    particles.style.position = "absolute"
    particles.style.top = "0"
    particles.style.left = "0"
    particles.style.right = "0"
    particles.style.bottom = "0"
    particles.style.pointerEvents = "none"
    particles.style.overflow = "hidden"

    element.style.position = "relative"
    element.appendChild(particles)

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div")
        particle.style.position = "absolute"
        particle.style.width = "4px"
        particle.style.height = "4px"
        particle.style.background = "var(--primary-color)"
        particle.style.borderRadius = "50%"
        particle.style.left = Math.random() * 100 + "%"
        particle.style.animation = `particleFloat ${2 + Math.random() * 2}s ease-out forwards`
        particle.style.animationDelay = Math.random() * 0.5 + "s"
        particles.appendChild(particle)
    }

    setTimeout(() => {
        particles.remove()
    }, 4000)
}

// Account Selection
document.addEventListener("click", (e) => {
    if (e.target.closest(".account-option")) {
        const accountOption = e.target.closest(".account-option")
        const account = accountOption.dataset.account

        // Remove active class from all options
        document.querySelectorAll(".account-option").forEach((option) => {
            option.classList.remove("active")
        })

        // Add active class to selected option
        accountOption.classList.add("active")
        selectedAccount = account

        // Add selection animation
        accountOption.style.transform = "scale(1.02)"
        setTimeout(() => {
            accountOption.style.transform = "scale(1)"
        }, 200)
    }
})

// Select Modal Recipient
function selectModalRecipient(email, name) {
    const recipientInput = document.getElementById("modalRecipient")
    if (recipientInput) {
        recipientInput.value = email

        // Add selection animation
        recipientInput.style.borderColor = "var(--success-color)"
        recipientInput.style.transform = "scale(1.02)"

        setTimeout(() => {
            recipientInput.style.borderColor = "var(--border-color)"
            recipientInput.style.transform = "scale(1)"
        }, 1000)

        showNotification(`Selected ${name} as recipient`, "success")
    }
}

// Update Confirmation Details
function updateConfirmationDetails() {
    document.getElementById("confirmAmount").textContent = `$${transferModalData.amount.toFixed(2)}`
    document.getElementById("confirmTotal").textContent = `$${transferModalData.amount.toFixed(2)}`
    document.getElementById("confirmFromAccount").textContent =
        transferModalData.fromAccount.charAt(0).toUpperCase() + transferModalData.fromAccount.slice(1) + " Account"
    document.getElementById("confirmToRecipient").textContent = transferModalData.toRecipient
    document.getElementById("confirmNote").textContent = transferModalData.note || "-"
}

// Handle Modal Transfer Form Submission
if (document.getElementById("modalTransferForm")) {
    document.getElementById("modalTransferForm").addEventListener("submit", async (e) => {
        e.preventDefault()

        const confirmBtn = document.getElementById("confirmBtn")

        // Start loading animation
        confirmBtn.classList.add("loading")
        confirmBtn.disabled = true

        try {
            // Simulate transfer processing
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // Update account balances
            accountBalances[transferModalData.fromAccount] -= transferModalData.amount
            updateAccountDisplays()

            // Add to transfer history
            transferHistory.unshift({
                id: Date.now(),
                ...transferModalData,
                timestamp: new Date(),
                status: "completed",
            })

            // Success animation
            confirmBtn.classList.remove("loading")
            confirmBtn.classList.add("success")

            // Show success overlay
            setTimeout(() => {
                showTransferSuccessOverlay(transferModalData)
            }, 1000)

            // Add transfer to transactions list
            addTransferToTransactionsList(transferModalData)
        } catch (error) {
            confirmBtn.classList.remove("loading")
            confirmBtn.disabled = false
            showNotification("Transfer failed. Please try again.", "error")
        }
    })
}

// Show Transfer Success Overlay
function showTransferSuccessOverlay(transferData) {
    const overlay = document.createElement("div")
    overlay.className = "transfer-success-overlay"
    overlay.innerHTML = `
    <div class="transfer-success-content">
      <div class="success-icon-large">
        <i class="fas fa-check"></i>
      </div>
      <h2 class="success-title">Transfer Successful!</h2>
      <p class="success-message">Your money has been sent successfully</p>
      <div class="success-details">
        <div class="success-detail-row">
          <span>Amount</span>
          <span>$${transferData.amount.toFixed(2)}</span>
        </div>
        <div class="success-detail-row">
          <span>To</span>
          <span>${transferData.toRecipient}</span>
        </div>
        <div class="success-detail-row">
          <span>From</span>
          <span>${transferData.fromAccount.charAt(0).toUpperCase() + transferModalData.fromAccount.slice(1)} Account</span>
        </div>
        <div class="success-detail-row">
          <span>Fee</span>
          <span style="color: var(--success-color);">Free</span>
        </div>
      </div>
      <button class="success-close-btn" onclick="closeTransferSuccessOverlay()">
        Done
      </button>
    </div>
  `

    document.body.appendChild(overlay)

    // Create success confetti
    createSuccessConfetti()

    // Auto close after 10 seconds
    setTimeout(() => {
        closeTransferSuccessOverlay()
    }, 10000)
}

// Close Transfer Success Overlay
function closeTransferSuccessOverlay() {
    const overlay = document.querySelector(".transfer-success-overlay")
    if (overlay) {
        overlay.style.animation = "fadeOut 0.3s ease-in"
        setTimeout(() => {
            overlay.remove()
            closeTransferModal()
        }, 300)
    }
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
    const transferModal = document.getElementById("transferModal")
    if (event.target === transferModal) {
        closeTransferModal()
    }
})

// Keyboard shortcuts for transfer modal
document.addEventListener("keydown", (e) => {
    const transferModal = document.getElementById("transferModal")
    if (transferModal && transferModal.style.display === "block") {
        // Escape to close modal
        if (e.key === "Escape") {
            closeTransferModal()
        }

        // Enter to proceed to next step or submit
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            if (currentTransferStep < 3) {
                nextStep()
            } else {
                const confirmBtn = document.getElementById("confirmBtn")
                if (confirmBtn && !confirmBtn.disabled) {
                    confirmBtn.click()
                }
            }
        }

        // Arrow keys for navigation
        if (e.key === "ArrowRight" && currentTransferStep < 3) {
            nextStep()
        }
        if (e.key === "ArrowLeft" && currentTransferStep > 1) {
            previousStep()
        }
    }
})

// Add fade out animation keyframes
const fadeOutKeyframes = `
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`

if (!document.getElementById("fadeout-keyframes")) {
    const fadeOutStyleSheet = document.createElement("style")
    fadeOutStyleSheet.id = "fadeout-keyframes"
    fadeOutStyleSheet.textContent = fadeOutKeyframes
    document.head.appendChild(fadeOutStyleSheet)
}


async function loginProcess() {

    const loginData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    console.log(JSON.stringify(loginData));

    const response = await fetch(
        "Login",
        {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json",
            }
        }
    );

    let loginBtn = document.getElementById("loginBtn");
    loginBtn.innerHTML = "<span>Processing ...</span>";

    if (response.ok) {
        var json = await response.json();

        if (json.success) {

            if(json.content==="USER"){
                window.location = "user/dashboard.html";
            }

            if(json.content==="ADMIN"){
                window.location = "admin/admin.html";
            }

        } else {

            loginBtn.innerHTML="<span class=\"btn-content\" id=\"loginText\">\n" +
                "                        <i class=\"fas fa-sign-in-alt\"></i>\n" +
                "                        Sign In Securely\n" +
                "                    </span>";

            Swal.fire({
                text: json.content,
                icon: "warning"
            });
        }
    } else {
        console.log("Error");
    }


}

async function registerUser() {

    let registrationData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        balance: document.getElementById("accountBalance").value,
    }

    if(document.getElementById("accountBalance").value === ""){
        registrationData.balance = "0";
    }

    let registerUserButton = document.getElementById("registerUserButton");
    registerUserButton.innerHTML = "<span>Processing ...</span>";

    const response = await fetch(
        "RegisterUser",
        {
            method: "POST",
            body: JSON.stringify(registrationData),
            headers: {
                "Content-Type": "application/json",
            }
        }
    );

    if (response.ok) {
        let json = await response.json();
        console.log("Response : " + JSON.stringify(json));

        if (json.success) {
            closeAddUserModal();
            clearRegisterInputs();

            Swal.fire({
                title: "Success",
                text: json.content,
                icon: "success"
            });

        } else {
            registerUserButton.innerHTML = " <i class=\"fas fa-plus\"></i> <span>Create User Account</span>";
            Swal.fire({
                text: json.content,
                icon: "warning"
            });
        }

    } else {
        console.log("Error");
    }

}

function clearRegisterInputs(){
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value="";
    document.getElementById("password").value = "";
    document.getElementById("accountBalance").value ="0";
}

//Logout User Process
function logoutUser() {
    window.location.href = "http://localhost:8080/regal-bank/Logout";
}


//Load User Dashboard
async function loadUserDashboard() {

    const response = await fetch(
        "LoadUserDashboard",
        {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }
    );

    if (response.ok) {
        let json = await response.json();
        console.log("Response : " + JSON.stringify(json));

        // if (json.success) {
        //     closeAddUserModal();
        //     clearRegisterInputs();
        //
        //     Swal.fire({
        //         title: "Success",
        //         text: json.content,
        //         icon: "success"
        //     });
        //
        // } else {
        //     registerUserButton.innerHTML = " <i class=\"fas fa-plus\"></i> <span>Create User Account</span>";
        //     Swal.fire({
        //         text: json.content,
        //         icon: "warning"
        //     });
        // }

    } else {
        console.log("Error");
    }

}


//Do Transaction Process
async function transactionProcess() {

    let toUser = document.getElementById("toAccount").value;
    let transferAmount = document.getElementById("transferAmount").value;
    let transferNote = document.getElementById("transferNote").value;

    if(toUser===""){
        showNotification("Enter Beneficiary Account Number","error");
    }else if(transferAmount===""){
        showNotification("Enter Amount","error")
    }else if(transferNote===""){
        showNotification("Enter Comment","error")
    }else{

        let transactionData = {
            toUserAccountNum: document.getElementById("toAccount").value,
            amount: document.getElementById("transferAmount").value,
            note: document.getElementById("transferNote").value,
        }

        const response = await fetch(
            "TransactionProcess",
            {
                method: "POST",
                body: JSON.stringify(transactionData),
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        if (response.ok) {
            let json = await response.json();

            if (json.success) {
                Swal.fire({
                    title: "Success",
                    text: json.content,
                    icon: "success"
                });
                clearQuickTransferForm();

            } else {
                Swal.fire({
                    title: "Warining",
                    text: json.content,
                    icon: "warning"
                });
            }

        } else {
            console.log("Error");
        }

    }
}

function clearQuickTransferForm(){
    document.getElementById("toAccount").value="";
    document.getElementById("transferAmount").value="";
    document.getElementById("transferNote").value=""
}

