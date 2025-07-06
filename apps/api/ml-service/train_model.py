from sklearn.neighbors import KNeighborsClassifier
import numpy as np
import joblib

# dataset contoh
X = [
    [1, 0, 0, 0, 1, 0],  # florist
    [0, 1, 0, 0, 1, 1],  # kasir
    [0, 1, 0, 1, 1, 0],  # barista
    [0, 0, 1, 0, 1, 0],  # office boy
    [0, 0, 0, 1, 1, 0],  # koki
    [1, 0, 0, 0, 0, 0],  # florist
    [0, 1, 0, 0, 1, 1],  # kasir
    [0, 1, 0, 1, 1, 0],  # barista
    [0, 0, 1, 0, 1, 0],  # office boy
    [0, 0, 0, 1, 1, 0],  # koki
]
y = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]

# inisialisasi dan training model
model = KNeighborsClassifier(n_neighbors=3)
model.fit(X, y)

joblib.dump(model, 'career_model.pkl')

# fungsi prediksi berdasarkan input pengguna
def recommend_career(suka_tanaman, suka_berinteraksi, suka_kebersihan, suka_masakan, bisa_fokus, suka_uang):
    user_input = np.array([[suka_tanaman, suka_berinteraksi, suka_kebersihan, suka_masakan, bisa_fokus, suka_uang]])
    prediction = model.predict(user_input)[0]
    career_labels = {
        0: "Florist",
        1: "Kasir",
        2: "Barista",
        3: "Office Boy (Cleaning)",
        4: "Koki"
    }
    return career_labels[prediction]