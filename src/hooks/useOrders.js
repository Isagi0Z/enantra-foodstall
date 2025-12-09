import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  updateDoc,
  doc,
  writeBatch
} from 'firebase/firestore';
import { db } from '../config/firebase';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for orders, ordered by creation time (oldest first)
    const q = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const ordersData = [];
        snapshot.forEach((doc) => {
          ordersData.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().orderNumber || Date.now()),
          });
        });
        setOrders(ordersData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  const completeOrder = async (orderId) => {
    return updateOrderStatus(orderId, 'completed');
  };

  const deleteCompletedOrders = async () => {
    try {
      const completedOrders = orders.filter(o => o.status === 'completed');
      if (completedOrders.length === 0) return;

      const batch = writeBatch(db);
      completedOrders.forEach((order) => {
        const orderRef = doc(db, 'orders', order.id);
        batch.delete(orderRef);
      });
      await batch.commit();
    } catch (error) {
      console.error('Error deleting completed orders:', error);
      throw error;
    }
  };

  return {
    orders,
    loading,
    updateOrderStatus,
    completeOrder,
    deleteCompletedOrders,
  };
}

