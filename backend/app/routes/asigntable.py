from flask import Blueprint, Flask, jsonify
from flask_login import current_user, login_user, logout_user
from ..models import Employee




bp = Blueprint("employee", __name__, url_prefix="/employee")

@bp.route('/', methods=["POST"])
def get_employees():
    employees = Employee.query.all()
    res = []
    for i in range(len(employees)):
        res.append({'id':employees[i].__dict__['id'], 'name':employees[i].__dict__['name']})

    return res
