from flask import Blueprint, Flask, jsonify, request
from flask_login import current_user, login_user, logout_user
from ..models import Employee, Order, db




bp = Blueprint("opentable", __name__, url_prefix="/opentable")

@bp.route('/', methods=["POST"])
def get_employees():
    data = request.get_json()
    print(data)
    new_order = Order(employee_id=data['employee_id'],table_id=data['table_id'], finished=False)
    # new_detail = OrderDetail(order_id=new_order.id)
    # new_detail.order = new_order
    db.session.add(new_order)
    # db.session.add(new_detail)
    db.session.commit()
    return jsonify({'code':200, 'msg':'ok', 'data': {'order_id':new_order.id}})
