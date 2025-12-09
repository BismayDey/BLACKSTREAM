import { collection, addDoc, query, where, orderBy, limit, getDocs, updateDoc, doc, onSnapshot, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: Date
  link?: string
}

export interface NotificationInput {
  userId: string
  title: string
  message: string
  type?: "info" | "success" | "warning" | "error"
  link?: string
}

// Send a notification to a user
export async function sendNotification(data: NotificationInput): Promise<void> {
  try {
    await addDoc(collection(db, "notifications"), {
      userId: data.userId,
      title: data.title,
      message: data.message,
      type: data.type || "info",
      read: false,
      createdAt: Timestamp.now(),
      link: data.link || null,
    })
  } catch (error) {
    console.error("Error sending notification:", error)
    throw error
  }
}

// Send notification to all users
export async function sendBroadcastNotification(
  data: Omit<NotificationInput, "userId">
): Promise<void> {
  try {
    // Get all user IDs
    const usersQuery = query(collection(db, "users"))
    const usersSnapshot = await getDocs(usersQuery)
    
    // Send notification to each user
    const promises = usersSnapshot.docs.map((userDoc) =>
      sendNotification({
        userId: userDoc.id,
        ...data,
      })
    )
    
    await Promise.all(promises)
  } catch (error) {
    console.error("Error sending broadcast notification:", error)
    throw error
  }
}

// Get user notifications
export async function getUserNotifications(
  userId: string,
  limitCount: number = 20
): Promise<Notification[]> {
  try {
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    )
    
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        read: data.read,
        createdAt: data.createdAt?.toDate() || new Date(),
        link: data.link,
      } as Notification
    })
  } catch (error) {
    console.error("Error getting notifications:", error)
    return []
  }
}

// Mark notification as read
export async function markNotificationAsRead(notificationId: string): Promise<void> {
  try {
    const notificationRef = doc(db, "notifications", notificationId)
    await updateDoc(notificationRef, {
      read: true,
    })
  } catch (error) {
    console.error("Error marking notification as read:", error)
    throw error
  }
}

// Mark all notifications as read
export async function markAllNotificationsAsRead(userId: string): Promise<void> {
  try {
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      where("read", "==", false)
    )
    
    const querySnapshot = await getDocs(q)
    
    const promises = querySnapshot.docs.map((docSnapshot) =>
      updateDoc(doc(db, "notifications", docSnapshot.id), {
        read: true,
      })
    )
    
    await Promise.all(promises)
  } catch (error) {
    console.error("Error marking all notifications as read:", error)
    throw error
  }
}

// Subscribe to real-time notifications
export function subscribeToNotifications(
  userId: string,
  callback: (notifications: Notification[]) => void
): () => void {
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(20)
  )
  
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const notifications = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        read: data.read,
        createdAt: data.createdAt?.toDate() || new Date(),
        link: data.link,
      } as Notification
    })
    
    callback(notifications)
  })
  
  return unsubscribe
}

// Format time ago
export function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return "Just now"
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks === 1 ? "" : "s"} ago`
  }
  
  return date.toLocaleDateString()
}
