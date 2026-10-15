extends Node2D

@onready var ball = $Ball
@onready var hole = $Hole
@onready var shot_label = $UI/ShotLabel
@onready var wind_label = $UI/WindLabel
@onready var club_label = $UI/ClubLabel
@onready var result_label = $UI/ResultLabel
@onready var power_bar = $UI/PowerBar
@onready var accuracy_bar = $UI/AccuracyBar
@onready var swing_button = $UI/SwingButton
@onready var reset_button = $UI/ResetButton

var shots_taken := 0
var max_shots := 3
var best_distance := 9999.0

var power_value := 50.0
var accuracy_value := 50.0
var power_direction := 1
var accuracy_direction := 1

var ball_velocity := Vector2.ZERO
var ball_moving := false

var wind_strength := 6.0
var wind_direction := Vector2.RIGHT

var selected_club := {
	"name": "Starter Iron",
	"power": 650,
	"control": 0.75
}

func _ready():
	ball.position = Vector2(180, 520)
	hole.position = Vector2(520, 180)

	swing_button.text = "Swing"
	reset_button.text = "Reset"

	swing_button.pressed.connect(_on_swing_pressed)
	reset_button.pressed.connect(_on_reset_pressed)

	_randomize_wind()
	_update_ui()

func _process(delta):
	_update_meters(delta)

	if ball_moving:
		ball.position += ball_velocity * delta
		ball_velocity = ball_velocity.lerp(Vector2.ZERO, 1.8 * delta)

		if ball_velocity.length() < 10:
			ball_moving = false
			_finish_shot()

func _update_meters(delta):
	power_value += power_direction * 80 * delta
	if power_value >= 100:
		power_value = 100
		power_direction = -1
	elif power_value <= 0:
		power_value = 0
		power_direction = 1

	accuracy_value += accuracy_direction * 110 * delta
	if accuracy_value >= 100:
		accuracy_value = 100
		accuracy_direction = -1
	elif accuracy_value <= 0:
		accuracy_value = 0
		accuracy_direction = 1

	power_bar.value = power_value
	accuracy_bar.value = accuracy_value

func _on_swing_pressed():
	if ball_moving:
		return

	if shots_taken >= max_shots:
		result_label.text = "Round over. Press Reset to play again."
		return

	shots_taken += 1

	var direction_to_hole = (hole.position - ball.position).normalized()

	var power_percent = power_value / 100.0
	var accuracy_error = abs(accuracy_value - 50.0) / 50.0

	var random_curve = randf_range(-1.0, 1.0) * accuracy_error * 0.8
	var shot_direction = direction_to_hole.rotated(random_curve)

	var base_power = selected_club["power"]
	var control = selected_club["control"]

	var final_power = base_power * power_percent
	var wind_effect = wind_direction * wind_strength * 12.0

	var miss_penalty = 1.0 - (accuracy_error * (1.0 - control))

	ball_velocity = shot_direction * final_power * miss_penalty + wind_effect
	ball_moving = true

	result_label.text = "Shot " + str(shots_taken) + " in motion..."
	_update_ui()

func _finish_shot():
	var distance_pixels = ball.position.distance_to(hole.position)
	var distance_feet = distance_pixels / 8.0

	if distance_feet < best_distance:
		best_distance = distance_feet

	if shots_taken >= max_shots:
		result_label.text = "Final Score: " + str(round(best_distance * 10) / 10.0) + " ft from pin"
	else:
		result_label.text = "Shot Result: " + str(round(distance_feet * 10) / 10.0) + " ft from pin"

	# Reset ball for next shot
	if shots_taken < max_shots:
		await get_tree().create_timer(1.5).timeout
		ball.position = Vector2(180, 520)

	_randomize_wind()
	_update_ui()

func _randomize_wind():
	wind_strength = randf_range(2.0, 12.0)
	wind_direction = Vector2(randf_range(-1.0, 1.0), randf_range(-0.3, 0.3)).normalized()

func _update_ui():
	shot_label.text = "Shots: " + str(shots_taken) + " / " + str(max_shots)
	wind_label.text = "Wind: " + str(round(wind_strength * 10) / 10.0) + " mph"
	club_label.text = "Club: " + selected_club["name"]

func _on_reset_pressed():
	shots_taken = 0
	best_distance = 9999.0
	ball.position = Vector2(180, 520)
	ball_velocity = Vector2.ZERO
	ball_moving = false
	result_label.text = "Take your shot."
	_randomize_wind()
	_update_ui()
