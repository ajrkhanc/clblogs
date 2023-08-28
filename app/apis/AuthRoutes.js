var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Post = require('../models/post');
var Category = require('../models/category');
var cookie = require('cookie-parser');
var config = require('../../config');
var Feedback = require('../models/feedback');
var Jobform = require('../models/jobform');
var Careercoachingsnapshot = require('../models/career-coaching-snapshot');
var AssesmentF = require('../models/gtd-assessment');
var WhatWouldYouDoAssessment = require('../models/what-would-you-do-assessment');
var StyleUnderStressassessment = require('../models/style-under-stress-assessment');
var influencerAssessment = require('../models/influencer-assessment');
var ThePOHAssesment = require('../models/the-power-of-habit-assessment');
var cors = require('cors');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

module.exports = function (express) {
  var apiRouter = express.Router();
  // define cors options
  var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  apiRouter.use(cors(corsOptions));
  // make a api to get posts from database
  apiRouter.get('/posts', function (req, res) {
    // get all posts from database
    Post.find({ isPublished: 1 }, function (err, posts) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve posts'
        });
      }
      else {
        posts = posts.reverse();
        res.json(posts);
      }
    });
  });


  // Save The POH Assessement
  apiRouter.route('/the-power-of-habit-assessment/')
  .post(function (req, res) {
    console.log(req.body)
    Post.findOne({ url: req.body.posturl }, function (err, post) {
      if (err) { console.log(err) }
      var ThePOHAssesmentnew = new ThePOHAssesment({
        q1: req.body.q1,
        q2: req.body.q2,
        q3: req.body.q3,
        q4: req.body.q4,
        q5: req.body.q5,
        q6: req.body.q6,
        q7: req.body.q7,
        q8: req.body.q8,
        q9: req.body.q9,
        q10: req.body.q10,
        q11: req.body.q11,
        q12: req.body.q12,
        q13: req.body.q13,
        q14: req.body.q14,
        q15: req.body.q15,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        organization:req.body.organization,
        newnameurl:req.body.newnameurl

      });
      ThePOHAssesmentnew.save(function (err) {
        if (err) {
          console.log(err)
        } else {
          return res.json({ message: 'Assesment Saved' });
        }
      });
    });
  })

  // The POH result
  apiRouter.get('/the-power-of-habit-assessment', function (req, res) {
    ThePOHAssesment.find({}, function (err, categories) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve categories'
        });
      }
      else {
        categories = categories.reverse()
        res.json(categories);
      }
    });
  });

       // The POH result by user
       apiRouter.get('/the-power-of-habit-assessment/:username', function (req, res) {
        // get all posts from database
        ThePOHAssesment.find({
          newnameurl: req.params.username
        }, function (err, posts) {
          if (err) {
            res.status(500).json({
              error: 'Could not retrieve posts'
            });
          }
          else {
            posts = posts.reverse();
            res.json(posts);
          }
        });
      });


      // Save Career Coaching Snapshot Assessement
  apiRouter.route('/career-coaching-snapshot/')
  .post(function (req, res) {
    console.log(req.body)
    Post.findOne({ url: req.body.posturl }, function (err, post) {
      if (err) { console.log(err) }
      var careercoachingsnapshot = new Careercoachingsnapshot({
        trust1: req.body.trust1,
        trust2: req.body.trust2,
        trust3: req.body.trust3,
        trust4: req.body.trust4,
        trust5: req.body.trust5,
        ec1: req.body.ec1,
        ec2: req.body.ec2,
        ec3: req.body.ec3,
        ec4: req.body.ec4,
        ec5: req.body.ec5,
        ec6: req.body.ec6,
        ec7: req.body.ec7,
        ec8: req.body.ec8,
        ec9: req.body.ec9,
        ec10: req.body.ec10,
        ec11: req.body.ec11,
        ec12: req.body.ec12,
        ec13: req.body.ec13,
        ec14: req.body.ec14,
        pf1: req.body.pf1,
        pf2: req.body.pf2,
        pf3: req.body.pf3,
        pf4: req.body.pf4,
        pf5: req.body.pf5,
        pf6: req.body.pf6,
        cr1: req.body.cr1,
        cr2: req.body.cr2,
        cr3: req.body.cr3,
        cr4: req.body.cr4,
        cr5: req.body.cr5,  
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        organization:req.body.organization,
        newnameurl:req.body.newnameurl

      });

      Careercoachingsnapshot.findOne({ email: req.body.email }, function (err, existingDoc) {
        if (existingDoc) {
          return res.json({ message: 'Email is already registered', status: 1 });
        } else {
          careercoachingsnapshot.save(function (err) {
            if (err) {
              console.log(err)
            } else {
              return res.json({ message: 'Fetching your result', status: 0 });
            }
          });
        }
      });
    });
  })

  // Career Coaching Snapshot result
  apiRouter.get('/career-coaching-snapshot-result', function (req, res) {
    Careercoachingsnapshot.find({}, function (err, categories) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve categories'
        });
      }
      else {
        categories = categories.reverse()
        res.json(categories);
      }
    });
  });

       // Career Coaching Snapshot result by user
       apiRouter.get('/career-coaching-snapshot/:username', function (req, res) {
        // get all posts from database
        Careercoachingsnapshot.find({
          newnameurl: req.params.username
        }, function (err, posts) {
          if (err) {
            res.status(500).json({
              error: 'Could not retrieve posts'
            });
          }
          else {
            posts = posts.reverse();
            res.json(posts);
          }
        });
      });

  // save GTD Assesment
  apiRouter.route('/assesmentf/')
  .post(function (req, res) {
    console.log(req.body)
    Post.findOne({ url: req.body.posturl }, function (err, post) {
      if (err) { console.log(err) }
      var assesmentf = new AssesmentF({
        q1: req.body.q1,
        q2: req.body.q2,
        q3: req.body.q3,
        q4: req.body.q4,
        q5: req.body.q5,
        q6: req.body.q6,
        q7: req.body.q7,
        q8: req.body.q8,
        q9: req.body.q9,
        q10: req.body.q10,
        q11: req.body.q11,
        q12: req.body.q12,
        q13: req.body.q13,
        q14: req.body.q14,
        q15: req.body.q15,
        q16: req.body.q16,
        q17: req.body.q17,
        q18: req.body.q18,
        q19: req.body.q19,
        q20: req.body.q20,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        organization:req.body.organization,
        newnameurl:req.body.newnameurl

      });
      assesmentf.save(function (err) {
        if (err) {
          console.log(err)
        } else {
          return res.json({ message: 'Assesment Saved' });
        }
      });
    });
  })

      // GTD Assesment result
      apiRouter.get('/fresult', function (req, res) {
        AssesmentF.find({}, function (err, categories) {
          if (err) {
            res.status(500).json({
              error: 'Could not retrieve categories'
            });
          }
          else {
            categories = categories.reverse()
            res.json(categories);
          }
        });
      });
  
    // GTD Assesment result by user
    apiRouter.get('/muser/:username', function (req, res) {
      // get all posts from database
      AssesmentF.find({
        newnameurl: req.params.username
      }, function (err, posts) {
        if (err) {
          res.status(500).json({
            error: 'Could not retrieve posts'
          });
        }
        else {
          posts = posts.reverse();
          res.json(posts);
        }
      });
    });

    // save What Would You Do Assessment
  apiRouter.route('/whatwouldyoudoassessment/')
  .post(function (req, res) {
    console.log(req.body)
    Post.findOne({ url: req.body.posturl }, function (err, post) {
      if (err) { console.log(err) }
      var whatwouldyoudoassessment = new WhatWouldYouDoAssessment({
        q1a1: req.body.q1a1,
        q1b1: req.body.q1b1,
        q2a1: req.body.q2a1,
        q2b1: req.body.q2b1,
        q3a1: req.body.q3a1,
        q3b1: req.body.q3b1,
        q4a1: req.body.q4a1,
        q4b1: req.body.q4b1,
        q5a1: req.body.q5a1,
        q5b1: req.body.q5b1,
        q6a1: req.body.q6a1,
        q6b1: req.body.q6b1,
        q7a1: req.body.q7a1,
        q7b1: req.body.q7b1,
        q8a1: req.body.q8a1,
        q8b1: req.body.q8b1,
        q9a1: req.body.q9a1,
        q9b1: req.body.q9b1,
        q10a1: req.body.q10a1,
        q10b1: req.body.q10b1,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        organization:req.body.organization,
        newnameurl:req.body.newnameurl

      });
      whatwouldyoudoassessment.save(function (err) {
        if (err) {
          console.log(err)
        } else {
          return res.json({ message: 'Assesment Saved' });
        }
      });
    });
  })

  // result
  apiRouter.get('/whatwouldyoudoassessment-result', function (req, res) {
    WhatWouldYouDoAssessment.find({}, function (err, categories) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve categories'
        });
      }
      else {
        categories = categories.reverse()
        res.json(categories);
      }
    });
  });

       // What would you do assessment result by user
       apiRouter.get('/whatwouldyoudoassessment/:username', function (req, res) {
        // get all posts from database
        WhatWouldYouDoAssessment.find({
          newnameurl: req.params.username
        }, function (err, posts) {
          if (err) {
            res.status(500).json({
              error: 'Could not retrieve posts'
            });
          }
          else {
            posts = posts.reverse();
            res.json(posts);
          }
        });
      });



























      // save styleunderstressassessment
  apiRouter.route('/styleunderstressassessment/')
  .post(function (req, res) {
    console.log(req.body)
    Post.findOne({ url: req.body.posturl }, function (err, post) {
      if (err) { console.log(err) }
      var styleunderstressassessment = new StyleUnderStressassessment({
        q1: req.body.q1,
        q2: req.body.q2,
        q3: req.body.q3,
        q4: req.body.q4,
        q5: req.body.q5,
        q6: req.body.q6,
        q7: req.body.q7,
        q8: req.body.q8,
        q9: req.body.q9,
        q10: req.body.q10,
        q11: req.body.q11,
        q12: req.body.q12,
        q13: req.body.q13,
        q14: req.body.q14,
        q15: req.body.q15,
        q16: req.body.q16,
        q17: req.body.q17,
        q18: req.body.q18,
        q19: req.body.q19,
        q20: req.body.q20,
        q21: req.body.q21,
        q22: req.body.q22,
        q23: req.body.q23,
        q24: req.body.q24,
        q25: req.body.q25,
        q26: req.body.q26,
        q27: req.body.q27,
        q28: req.body.q28,
        q29: req.body.q29,
        q30: req.body.q30,
       
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        organization:req.body.organization,
        newnameurl:req.body.newnameurl

      });
      styleunderstressassessment.save(function (err) {
        if (err) {
          console.log(err)
        } else {
          return res.json({ message: 'Assesment Saved' });
        }
      });
    });
  })

  // result
  apiRouter.get('/styleunderstressassessment-result', function (req, res) {
    StyleUnderStressassessment.find({}, function (err, categories) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve categories'
        });
      }
      else {
        categories = categories.reverse()
        res.json(categories);
      }
    });
  });

       // styleunderstressassessment result by user
       apiRouter.get('/styleunderstressassessment/:username', function (req, res) {
        // get all posts from database
        StyleUnderStressassessment.find({
          newnameurl: req.params.username
        }, function (err, posts) {
          if (err) {
            res.status(500).json({
              error: 'Could not retrieve posts'
            });
          }
          else {
            posts = posts.reverse();
            res.json(posts);
          }
        });
      });


      // save Influencer Assessement
  apiRouter.route('/influencer-assessment/')
  .post(function (req, res) {
    console.log(req.body)
    Post.findOne({ url: req.body.posturl }, function (err, post) {
      if (err) { console.log(err) }
      var influencerassessment = new influencerAssessment({
        q1a: req.body.q1a,
        q1b: req.body.q1b,
        q1c: req.body.q1c,
        q1d: req.body.q1d,
        q2a: req.body.q2a,
        q2b: req.body.q2b,
        q2c: req.body.q2c,
        q2d: req.body.q2d,
        q3a: req.body.q3a,
        q3b: req.body.q3b,
        q3c: req.body.q3c,
        q3d: req.body.q3d,
        q4a: req.body.q4a,
        q4b: req.body.q4b,
        q4c: req.body.q4c,
        q4d: req.body.q4d,
        q5a: req.body.q5a,
        q5b: req.body.q5b,
        q5c: req.body.q5c,
        q5d: req.body.q5d,
        q6a: req.body.q6a,
        q6b: req.body.q6b,
        q6c: req.body.q6c,
        q6d: req.body.q6d,
        q7a: req.body.q7a,
        q7b: req.body.q7b,
        q7c: req.body.q7c,
        q7d: req.body.q7d,
        q8a: req.body.q8a,
        q8b: req.body.q8b,
        q8c: req.body.q8c,
        q8d: req.body.q8d,        
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        organization:req.body.organization,
        newnameurl:req.body.newnameurl

      });
      influencerassessment.save(function (err) {
        if (err) {
          console.log(err)
        } else {
          return res.json({ message: 'Assesment Saved' });
        }
      });
    });
  })

  // influencer assessment result
  apiRouter.get('/influencer-assessment-result', function (req, res) {
    influencerAssessment.find({}, function (err, categories) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve categories'
        });
      }
      else {
        categories = categories.reverse()
        res.json(categories);
      }
    });
  });

       // influencer assessment result by user
       apiRouter.get('/influencer-assessment/:username', function (req, res) {
        // get all posts from database
        influencerAssessment.find({
          newnameurl: req.params.username
        }, function (err, posts) {
          if (err) {
            res.status(500).json({
              error: 'Could not retrieve posts'
            });
          }
          else {
            posts = posts.reverse();
            res.json(posts);
          }
        });
      });


  // get all categories
  apiRouter.get('/categories', function (req, res) {
    Category.find({}, function (err, categories) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve categories'
        });
      }
      else {
        res.json(categories);
      }
    });
  });

  // get post by url slug
  apiRouter.get('/post/:slug', function (req, res) {
    // get all posts from database
    Post.findOne({
      posturl: req.params.slug
    }, function (err, post) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve post'
        });
      }
      else {
        res.json(post);
      }
    });
  });


  // get posts by category
  apiRouter.get('/posts/category/:category', function (req, res) {
    // get all posts from database
    Post.find({
      category: req.params.category
    }, function (err, posts) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve posts'
        });
      }
      else {
        posts = posts.reverse();
        res.json(posts);
      }
    });
  });


  // get posts by tag
  apiRouter.get('/posts/tag/:tag', function (req, res) {
    // get all posts from database
    Post.find({
      tags: req.params.tag
    }, function (err, posts) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve posts'
        });
      }
      else {
        posts = posts.reverse();
        res.json(posts);
      }
    });
  });

  // get posts by author
  apiRouter.get('/posts/author/:author', function (req, res) {
    // get all posts from database
    Post.find({
      Author: req.params.author
    }, function (err, posts) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve posts'
        });
      }
      else {
        posts = posts.reverse();
        res.json(posts);
      }
    });
  });


  // save jobfom api
  apiRouter.route('/jobform/')
    .post(function (req, res) {
      console.log(req.body)
      Post.findOne({ url: req.body.posturl }, function (err, post) {
        if (err) { console.log(err) }
        var jobform = new Jobform({
          FullName: req.body.FullName,
          Gender: req.body.Gender,           
          Dob: req.body.Dob,
          MobileNumber: req.body.MobileNumber,
          WhatsappMobileNumber: req.body.WhatsappMobileNumber,
          EmailAddress: req.body.EmailAddress,
          CurrentCity: req.body.CurrentCity,
          CurrentState: req.body.CurrentState,
          PermanentCity: req.body.PermanentCity,
          PermanentState: req.body.PermanentState,
          PermanentAddress: req.body.PermanentAddress,
          CurrentAddress: req.body.CurrentAddress,
          HighestQualification: req.body.HighestQualification,
          ExperienceYears: req.body.ExperienceYears,
          ExperienceMonths: req.body.ExperienceMonths,
          Designation: req.body.Designation,
          Expectedsalary: req.body.Expectedsalary,
          VehicleRequirement: req.body.VehicleRequirement,
          SmartPhone: req.body.SmartPhone,
          NativeLanguage: req.body.NativeLanguage,
          Resume:  req.body.random +'_'+ req.body.file,
          PublishDate: new Date().toLocaleDateString(),

        });
        jobform.save(function (err) {
          if (err) {
            console.log(err)
          } else {
            return res.json({ message: 'jobform Saved' });
          }
        });
      });
    })



  //upload image
  apiRouter.post('/resume', function (req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.log(files);
      var oldPath = files.file._writeStream.path;
      var newPath = path.join(__dirname, '../../public/uploads/proanto/resume')
        + '/' + fields.randomno+ '_' +files.file.originalFilename.replace(/\s/g, '')
      var rawData = fs.readFileSync(oldPath)

      fs.writeFile(newPath, rawData, function (err) {
        if (err) console.log(err)
        return res.send("Successfully uploaded")
      })
    })
  });


  // get all jobform
  apiRouter.get('/proanto/jobform', function (req, res) {
    var token = req.cookies.token;
    jwt.verify(token, config.superSecret, function(err, decoded){
      if(err){
        res.status(401).json({
          error: 'You are not authorized to view this content'
        });
      }
      Jobform.find({}, function (err, Jobform) {
        if (err) {
          res.status(500).json({
            error: 'Could not retrieve Jobform'
          });
        }
        else {
          res.json(Jobform);
        }
      });
    });
  });


  // save feedback api
  apiRouter.route('/feedback/')
    .post(function (req, res) {
      console.log(req.body)
      Post.findOne({ url: req.body.posturl }, function (err, post) {
        if (err) { console.log(err) }
        var feedback = new Feedback({
          user: req.body.name,
          email: req.body.email,
          post: req.body.postslug,
          comment: req.body.feedback,
          PublishDate: new Date().toLocaleDateString(),

        });
        feedback.save(function (err) {
          if (err) {
            console.log(err)
          } else {
            return res.json({ message: 'Feeback Saved' });
          }
        });
      });
    })

  // get all getFeedbacks
  apiRouter.get('/getFeedbacks', function (req, res) {
    Feedback.find({}, function (err, Feedback) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve Feedback'
        });
      }
      else {
        res.json(Feedback);
      }
    });
  });

  apiRouter.get('/getFeedback/:posturl', function (req, res) {
    // get all posts from database
    Feedback.findOne({
      post: req.params.posturl
    }, function (err, feedback) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve feedback'
        });
      }
      else {
        res.json(feedback);
      }
    });
  });

  // get feedback by post
  apiRouter.get('/posts/feed/:posturl', function (req, res) {
    // get all posts from database
    Feedback.find({
      post: req.params.posturl,
      status: '1'
    }, function (err, posts) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve posts'
        });
      }
      else {
        posts = posts.reverse()
        res.json(posts);
      }
    });
  });

  // Find Single Job
  apiRouter.get('/proanto/jobform/:id', function (req, res) {
    Jobform.find({
      _id: req.params.id,     
    }, function (err, jobforms) {
      if (err) {
        res.status(500).json({
          error: 'Could not retrieve data'
        });
      }
      else {
        res.json(jobforms);
      }
    });
  });


  apiRouter.route('/signup')
    .get(function (req, res) {
      res.render('Signup');
    })
    .post(function (req, res) {
      var user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        bio: req.body.bio,
        //Role: 'user',
        imageURL: req.body.imageURL || '',
        Social: {
          FaceBook: req.body.facebook || '',
          Twitter: req.body.twitter || '',
          WebSite: req.body.website || '',
          LinkedIn: req.body.linkedin || '',
          YouTube: req.body.youtube || ''
        }
      });
      user.save(function (err) {
        if (err) {
          return res.status(406).json({ message: 'can\'t save user because of ' + err });
        }

        var token = jwt.sign(user, config.superSecret, {
          //expiresIn: '24 days'
          expiresIn: '24 days'

        });
        res.cookie('token', token);
        /*user.password = null;
        localStorage.user = user;*/
        res.json({ message: 'user with name : ' + user.name + ' Added' });
      });
    });


  apiRouter.route('/login')
    .get(function (req, res) {
      var token = req.cookies.token;
      if (!token) {
        //res.render('login');
        res.json('as login page');
      }
      res.redirect('/');
    })
    .post(function (req, res) {
      var jsob;
      if (req.body.username.indexOf('@') === -1) {

        jsob = {
          username: req.body.username
        }
      } else {

        jsob = {
          email: req.body.username
        }
      }
      User.findOne(jsob).select('email password name bio Role imageURL username Social').exec(function (err, user) {
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }

        if (!user.comparePassword(req.body.password)) {
          return res.status(406).json({ message: 'Wrong Password' });
        }
        var token = jwt.sign(user, config.superSecret, {
          expiresIn: '24 days'
        });
        res.cookie('token', token, { httpOnly: true });
        user.password = null;
        res.cookie('decoded', { _doc: user }, { httpOnly: true });
        return res.json({ message: 'LoggedIn' });// replaced with redirect
      });
    });

  apiRouter.route('/logout')
    .get(function (req, res) {
      res.clearCookie('token');
      res.clearCookie('decoded');
      res.clearCookie({});
      res.json({ message: 'LoggedOut' });
    });



  apiRouter.use(function (req, res, next) {
    if (!req.cookies.token) {
      res.redirect('/login');
    }
    jwt.verify(req.cookies.token, config.superSecret, function (err, decoded) {
      req.decoded = decoded;
      next();
    });
  });

  apiRouter.get('/profile', function (req, res) {
    res.json({ user: req.decoded._doc });
  });
  apiRouter.get('/', function (req, res) {
    res.json(req.decoded);
  });


  apiRouter.post('/changedetails', function (req, res) {

    User.findOne({ email: req.decoded._doc.email }, function (err, user) {
      if (err) res.status(400).json({ message: 'user not found' });
      user.password = req.body.password || req.decoded._doc.password;
      user.name = req.body.name || req.decoded._doc.name;
      user.bio = req.body.bio || req.decoded._doc.bio;
      user.Role = req.decoded._doc.Role;
      user.imageURL = req.body.imageURL || req.decoded._doc.imageURL;
      user.save(function (err) {
        if (err) {
          res.status(400).json({ message: 'Wrong thing' });
        }
        user.password = null;
        res.cookie('decoded', { _doc: user }, { httpOnly: true });
        res.json({ message: 'updated !!' });

      });
    });
  });
  /*
  User.findOneAndUpdate({email:req.decoded._doc.email},{$set:{
    password : req.body.password || req.decoded._doc.password,
    name: req.body.name || req.decoded._doc.name,
    bio: req.body.bio || req.decoded._doc.bio,
    Role: req.decoded._doc.Role,
    imageURL: req.body.imageURL || req.decoded._doc.imageURL
  }},function(err){
    if(err){
      console.log(err);
      return;
    }
    res.json({message:'updated !!'});
  });
  
  */
  //Admin middleware
  apiRouter.use(function (req, res, next) {
    if (req.decoded._doc.Role == "admin") {
      return next();
    }
    return res.redirect('/');
  });

  apiRouter.post('/changerole', function (req, res) {
    User.findOneAndUpdate({ username: req.body.username }, { $set: { Role: req.body.Role } }, function (err) {
      if (err) {
        console.log(err);
        res.status(400).json({ message: 'error' });
        return;
      }
      res.json({ message: 'Updated' });
    })
  });

  apiRouter.get('/AllUsers', function (req, res) {
    User.find({}, function (err, users) {
      if (err) throw err;
      res.cookie('users', users, { httpOnly: true });
      res.json({ users: users });
    });
  });

  return apiRouter;
};
