import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  constructor(private firestore: Firestore) {}

  registerUser(user: { email: String; password: String }) {
    const usersRef = collection(this.firestore, 'users');
    return addDoc(usersRef, user);
  }

  getUser() {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, {
      idField: 'id',
    });
  }
}
