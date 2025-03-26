# app/models.py
import sqlite3
from datetime import datetime

DB_PATH = "transcriptions.db"

#Initialize database and create table if it doesn't exist
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS transcriptions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            transcription TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

def save_transcription(filename: str, transcription: str):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        INSERT INTO transcriptions (filename, transcription, created_at)
        VALUES (?, ?, ?)
    ''', (filename, transcription, datetime.now()))
    conn.commit()
    conn.close()

def get_all_transcriptions():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT filename, transcription, created_at FROM transcriptions')
    rows = c.fetchall()
    conn.close()
    return [{"filename": row[0], "transcription": row[1], "created_at": row[2]} for row in rows]

def search_transcriptions(filename: str):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    #Search by a substring match on filename | "LIKE" '%xxx%' for substring(xxx) match
    c.execute('''
        SELECT filename, transcription, created_at FROM transcriptions
        WHERE filename LIKE ?
    ''', (f"%{filename}%",))
    rows = c.fetchall()
    conn.close()
    return [{"filename": row[0], "transcription": row[1], "created_at": row[2]} for row in rows]
