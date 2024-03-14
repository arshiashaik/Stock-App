from flask import Flask, jsonify
import requests
from flask_cors import CORS  
from datetime import datetime
from dateutil.relativedelta import relativedelta

app = Flask(__name__)

# To resolve CORS errors on all routes
CORS(app)

# API keys
FINNHUB_API_KEY = 'cnh6u5hr01qhlsligjk0cnh6u5hr01qhlsligjkg'
TIINGO_API_KEY = '1e5fe5235b568bc08ca6e8739a34bd7091576651'

# Date formatter for Latest News Data url 
to_date = datetime.now().date().strftime('%Y-%m-%d') 
from_date = (datetime.now().date() - relativedelta(days=30)).strftime('%Y-%m-%d')

# Date formatter for Insights Data url 
six_months_one_day_ago = (datetime.now().date() - relativedelta(months=6) - relativedelta(days=1)).strftime('%Y-%m-%d')

# Company Data
@app.route('/company/<ticker>')
def get_company_data(ticker):
    url = f'https://finnhub.io/api/v1/stock/profile2?symbol={ticker}&token={FINNHUB_API_KEY}'
    response = requests.get(url)
    if response.status_code == 200:
        stock_data = response.json()
        return jsonify({ticker: stock_data})
    else:
        return jsonify({"error": "Failed to fetch stock data"}), 500

# Summary Data
@app.route('/summary/<ticker>')
def get_summary_data(ticker):
    url = f'https://finnhub.io/api/v1/quote?symbol={ticker}&token={FINNHUB_API_KEY}'
    response = requests.get(url)
    if response.status_code == 200:
        stock_data = response.json()
        return jsonify({ticker: stock_data})
    else:
        return jsonify({"error": "Failed to fetch stock data"}), 500

# Trend Data
@app.route('/trend/<ticker>')
def get_trend_data(ticker):
    url = f'https://finnhub.io/api/v1/stock/recommendation?symbol={ticker}&token={FINNHUB_API_KEY}'
    response = requests.get(url)
    if response.status_code == 200:
        stock_data = response.json()
        return jsonify({ticker: stock_data})
    else:
        return jsonify({"error": "Failed to fetch stock data"}), 500

#nsights Data
@app.route('/insights/<ticker>')
def get_insights_data(ticker):
    print(six_months_one_day_ago)
    url = f'https://api.tiingo.com/iex/{ticker}/prices?startDate={six_months_one_day_ago}&resampleFreq=12hour&columns=open,high,low,close,volume&token={TIINGO_API_KEY}'
    response = requests.get(url)
    print(url)
    if response.status_code == 200:
        stock_data =response.json()
        return jsonify({ticker:stock_data})
    else:
        return jsonify({"error": "Failed to fetch stock data" }), 500
    
# Latest News Data
@app.route('/news/<ticker>')
def get_news_data(ticker):
    url = f'https://finnhub.io/api/v1/company-news?symbol={ticker}&from={from_date}&to={to_date}&token={FINNHUB_API_KEY}'
    response = requests.get(url)
    if response.status_code == 200:
        stock_data = response.json()
        return jsonify({ticker: stock_data})
    else:
        return jsonify({"error": "Failed to fetch stock data"}), 500


# if __name__ == '__main__':
#     app.run(debug=True)
