from flask import Flask, request, jsonify, send_from_directory
import random

app = Flask(__name__, static_url_path='', static_folder='.')

@app.route('/start_game', methods=['GET'])
def start_game():
    random_number = random.randint(1, 100)
    return jsonify({'number': random_number})

@app.route('/guess', methods=['POST'])
def guess():
    data = request.json
    guess = data['guess']
    number = data['number']
    if guess < number:
        return jsonify({'result': 'Too low!'})
    elif guess > number:
        return jsonify({'result': 'Too high!'})
    else:
        return jsonify({'result': 'Correct!'})

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/sudoku.html')
def serve_sudoku():
    return send_from_directory('.', 'sudoku.html')

@app.route('/math_game.html')
def serve_math_game():
    return send_from_directory('.', 'math_game.html')

if __name__ == '__main__':
    app.run(port=5001, debug=True)
