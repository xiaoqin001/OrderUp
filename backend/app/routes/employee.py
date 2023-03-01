from flask import Blueprint, Flask, jsonify
from flask_login import current_user, login_user, logout_user
from ..models import Employee




bp = Blueprint("employee", __name__, url_prefix="/employee")

@bp.route('/', methods=["GET"])
def get_employees():
    employees = Employee.query.all()
    return jsonify([employee.__dict__ for employee in employees])
