export function useBookings() {
    const bookings = ref([
        {
            id: "123",
            title: "Trip to the Beach",
            category: "Travel",
            date: new Date("2023-12-22"),
            description: "Relaxing getaway with ocean views",
            status: "Approved",
            statusIcon: "mdi-check",
            statusText: "Approved",
        },
        {
            id: "456",
            title: "Concert tickets",
            category: "Entertainment",
            date: new Date("2024-01-10"),
            description: "See your favorite band live!",
            status: "Pending",
            statusIcon: "mdi-clock",
            statusText: "Pending",
        },
    ]);

    return { bookings };
}