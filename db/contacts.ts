// app/db/contacts.ts

type Contact = {
  firstName: string;
  name: string;
  phoneNumber: string;
  id: number;
};

type SQLiteDatabase = any;

export const addContact = async (db: SQLiteDatabase, contact: Contact) => {
  const insertQuery = `
     INSERT INTO Contacts (firstName, name, phoneNumber)
     VALUES (?, ?, ?)
   `;
  const values = [contact.firstName, contact.name, contact.phoneNumber];
  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add contact');
  }
};

// app/db/contacts.ts

export const getContacts = async (db: SQLiteDatabase): Promise<Contact[]> => {
  try {
    const contacts: Contact[] = [];
    const results = await db.executeSql('SELECT * FROM Contacts');
    results?.forEach(
      (result: {rows: {length: number; item: (arg0: number) => Contact}}) => {
        for (let index = 0; index < result.rows.length; index++) {
          contacts.push(result.rows.item(index));
        }
      },
    );
    return contacts;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Contacts from database');
  }
};

// app/db/contacts.ts

export const updateContact = async (
  db: SQLiteDatabase,
  updatedContact: Contact,
) => {
  const updateQuery = `
      UPDATE Contacts
      SET firstName = ?, name = ?, phoneNumber = ?
      WHERE id = ?
    `;
  const values = [
    updatedContact.firstName,
    updatedContact.name,
    updatedContact.phoneNumber,
    updatedContact.id,
  ];
  try {
    return db.executeSql(updateQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to update contact');
  }
};

// app/db/contacts.ts

export const deleteContact = async (db: SQLiteDatabase, contact: Contact) => {
  const deleteQuery = `
      DELETE FROM Contacts
      WHERE id = ?
    `;
  const values = [contact.id];
  try {
    return db.executeSql(deleteQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to remove contact');
  }
};
