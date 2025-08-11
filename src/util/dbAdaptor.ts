import type { Reservation } from '@/types/global';

import fs from 'fs';
import path from 'path';

class DBAdaptor {
  private dbPath: string;

  constructor() {
    this.dbPath = path.join(process.cwd(), 'db.json');
    
    if (!fs.existsSync(this.dbPath)) {
      console.log('db.json not found, creating a new one...');
      this.initDb();
    }
  }
  readReservationDb(): Promise<string> {
    return fs.promises.readFile(this.dbPath, 'utf-8');
  }

  writeReservationDb(data: Reservation[]) {
    return fs.promises.writeFile(this.dbPath, JSON.stringify({ data }), 'utf8');
  }

  initDb() {
    return fs.promises.writeFile(
      this.dbPath,
      JSON.stringify({ reservations: [] }),
      'utf8'
    );
  }
}

const DB = new DBAdaptor();
export default DB;
