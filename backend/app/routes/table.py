from flask import Blueprint, Flask, jsonify
from ..models import Table



bp = Blueprint("table", __name__, url_prefix="/table")


@bp.route('/', methods=["GET"])
def get_tables():
    tables = Table.query.all()
    return jsonify([table.__dict__ for table in tables])
