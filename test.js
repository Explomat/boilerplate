function Task(id){
	return {
		id,
		name: 'Задача ' + id,
		unit: '1',
		weight: '2',
		min: '3',
		targ: '4',
		max: '5',
		fact: '6',
		percent: '22',
		isEdit: getRandomArbitrary(0, 2)
	};
}


assessment: {
	assId: 1,
	paId: 2,
	halves: {
		0: {
			title: 'Half 0',
			startDate: new Date(),
			endDate: new Date(),
			categories: [ 0, 1, 2, 3 ]
		}
	}
}

categories: {
	0: {
		title: 'Category 0',
		startDate: new Date(),
		endDate: new Date(),
		bossFullname: '\'ФИО руководителя\'',
		viewType: 0,
		data: 0
	},
	1: {
		title: 'Category 1',
		startDate: new Date(),
		endDate: new Date(),
		bossFullname: '\'ФИО руководителя\'',
		viewType: 1,
		data: 1
	},
	2: {
		title: 'Category 2',
		startDate: new Date(),
		endDate: new Date(),
		bossFullname: '\'ФИО руководителя\'',
		viewType: 2,
		data: 2
	},
	3: {
		title: 'Category 3',
		startDate: new Date(),
		endDate: new Date(),
		bossFullname: '\'ФИО руководителя\'',
		viewType: 3,
		data: 3
	}
}

categoriesData: {
	0: {
		quarters: {
			0: {
				title: 'Квартал 0',
				tasks: [ 0, 1 ]
			},
			1: {
				title: 'Квартал 1',
				tasks: [ 2 ]
			}
		}
		tasks: {
			header: {
				name: 'Наименование',
				unit: '...',
				weight: '...',
				min: '...'
			},
			list: {
				0: Task(0),
				1: Task(1),
				2: Task(2)
			}
			
		}
	},
	1: {
		title: 'Год',
		tasks: {o tg-d6hofmko
			header: {
				name: 'Наименование',
				unit: '...',
				weight: '...',
				min: '...'
			},
			list: {
				0: Task(0)
			}
		}
	},
	2: {
		title: 'Год/Месяц',
		year: {
			devPaId: 1,
			tasks: {
				header: {
					name: 'Наименование',
					unit: '...',
					weight: '...',
					min: '...'
				},
				list: {
					0: Task(0)
				}
			}
		},
		months: {
			0: {
				title: 'Месяц 0',
				tasks: [ 0 ]
			},
			1: {
				title: 'Месяц 1',
				tasks: [ 1 ]
			}
		},
		monthTasks: {
			header: {
				name: 'Наименование',
				unit: '...',
				weight: '...',
				min: '...'
			},
			list: {
				0: Task(0),
				1: Task(1)
			}
		}
	},
	3: {
		title: 'Пол года/месяц',
		
		halfYear: {
			devPaId: 1,
			
			tasks: {
				header: {
					name: 'Наименование',
					unit: '...',
					weight: '...',
					min: '...'
				},
				list: {
					0: Task(0)
				}
			},
		}
			
		months: {
			0: {
				title: 'Месяц 0',
				tasks: [ 0 ]
			},
			1: {
				title: 'Месяц 1',
				tasks: [ 1 ]
			}
		},
		monthTasks: {
			header: {
				name: 'Наименование',
				unit: '...',
				weight: '...',
				min: '...'
			},
			list: {
				0: Task(0),
				1: Task(1)
			}
		}
	}
}