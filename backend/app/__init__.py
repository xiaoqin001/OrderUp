from flask import Flask
from .config import Configuration
from .routes import employee, table, asigntable, order, menu
from .models import db, Employee
from flask_login import LoginManager
from flask_cors import *


app = Flask(__name__)
CORS(app, supports_credentials=True)



app.config.from_object(Configuration)
app.register_blueprint(employee.bp)
app.register_blueprint(table.bp)
# app.register_blueprint(asigntable.bp)
app.register_blueprint(order.bp)
app.register_blueprint(menu.bp)
app.register_blueprint(asigntable.bp)


db.init_app(app)



# login = LoginManager(app)
# login.login_view = "session.login"


# @login.user_loader
# def load_user(id):
#     return Employee.query.get(int(id))
