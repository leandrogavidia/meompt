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

  createProfile({
    image,
    fullname,
    description,
  }: {
    image: string | null;
    fullname: string;
    description: string | null;
  }) {
    const profilesRef = collection(this.firestore, 'profiles');
    return addDoc(profilesRef, { image, fullname, description });
  }

  getUser() {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, {
      idField: 'id',
    });
  }
}
