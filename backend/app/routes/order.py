from flask import Blueprint, request, jsonify
from flask_login import login_required
from ..models import Order, db


bp = Blueprint("order", __name__, url_prefix="/order")


@bp.route("/", methods=["GET","POST"])
# @login_required
def open_order():
    data = request.get_json()
    print(data)
    if request.method == "POST":
        new_order = Order(employee_id=data['employee_id'],table_id=data['table_id'], finished=False)
        db.session.add(new_order)
        db.session.commit()
        return jsonify({'code':200, 'msg':'ok', 'data': {'order_id':new_order.id}})
    else:
        return
