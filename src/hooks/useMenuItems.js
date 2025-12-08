import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot,
  updateDoc,
  doc,
  getDocs,
  setDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { menuItems as defaultMenuItems } from '../data/menuItems';

export function useMenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize menu items in Firestore if they don't exist
    const initializeMenu = async () => {
      try {
        const menuRef = collection(db, 'menu');
        const snapshot = await getDocs(menuRef);
        
        if (snapshot.empty) {
          // Initialize with default menu items
          defaultMenuItems.forEach(async (item) => {
            const itemRef = doc(db, 'menu', item.id.toString());
            await setDoc(itemRef, {
              ...item,
              available: true,
            });
          });
        }
      } catch (error) {
        console.error('Error initializing menu:', error);
      }
    };

    initializeMenu();

    // Real-time listener for menu items
    const unsubscribe = onSnapshot(
      collection(db, 'menu'),
      (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        
        // If no items in Firestore, use default items
        if (items.length === 0) {
          setMenuItems(defaultMenuItems.map(item => ({ ...item, available: true })));
        } else {
          setMenuItems(items);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching menu items:', error);
        // Fallback to default items
        setMenuItems(defaultMenuItems.map(item => ({ ...item, available: true })));
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateAvailability = async (itemId, available) => {
    try {
      const itemRef = doc(db, 'menu', itemId.toString());
      await updateDoc(itemRef, {
        available,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating availability:', error);
      throw error;
    }
  };

  return {
    menuItems,
    loading,
    updateAvailability,
  };
}

